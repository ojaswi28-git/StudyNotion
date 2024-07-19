const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator")
const User = require("../models/User")
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
// const mailSender = require("../utils/mailSender");
require("dotenv").config();


// Send OTP
exports.sendOTP = async (req,res) =>{
    try{
        // fetch email from request body
        const {email} = req.body;
        
        // check if user with provided email
        const checkUserPresent = await User.findOne({email});
        
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: "User is already registered, Please Login"
            })
        }
        
        // Generate OTP
        var otp = otpGenerator.generate(6,{
            digits: true, 
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });
        
        
        const result = await OTP.findOne({ otp: otp });
		console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}

        // const result = OTP.findOne({otp : otp});
        // while(result){
        //     otp = otpGenerator.generate(6,{
        //         upperCaseAlphabets: false, 
        //     });
        // }
        console.log("Otp send function start")

        // const otpPayload = {email, otp};
        // Store entry into DB
        const otpBody = await OTP.create({
            email,
            otp
        });

        // Success response of OTP generator
        res.status(200).json({
            success: true,
            message: "OTP Generate SuccessFully",
            otp,
        })

    }
    catch(err){
        res.status(400).json({
            success: false,
            message: "Something Went Wrong In OTP Genertor",
        })
    }

}


// Sign UP
exports.signUp = async(req,res) => {
    try{

        // fetch data
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            contactNumber,
            accountType,
            // additionDetails,
            otp,
        } = req.body;

        // Validate the Input Data

        if(
            !firstName || 
            !lastName || 
            !email || 
            !password || 
            !confirmPassword || 
            // !contactNumber ||
            !accountType ||
            !otp
        )  {
                return res.status(403).json({
                    success: false,
                    message : "All fields are required",
                })
        }
        
        // Check password And confirm Password match or not
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message : "Password Does'nt Match",
            })
        }

        // Check if User already exist
        const existUser = await User.findOne({email});
        if(existUser){
            res.status(400).json({
                success : false,
                message : "User is already registered, Please Login!"
            })
        }

        // Validate OTP
        // const recentOTP = await OTP.find({ email }).sort({ createAt : -1 }).limit(1);
        const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(recentOTP)
        // OTP not found
        if(recentOTP.length === 0){
            // OTP not found for the email
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            })
        } 
        else if(otp !== recentOTP[0].otp){
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            })
        }


        // Hashing the password

        const hashPassword = await bcrypt.hash(password, 10);
        // catch(err){
        //     res.status(400).json({
        //         success: true,
        //         message: "Error In Password Hashing"
        //     })
        // }

        // Create the user
        let approved = "";
        approved === "Instructor"? (approved = false) : (approved = true);

        // Create Additional Profile for User
        const profilePayload = {
            gender : null,
            contactNumber: null,
            about: null,
            dateOfBirth: null,
            profession: null,
        }
        const profileDetails = await Profile.create(profilePayload);

        
        // Save entry into Database
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword, 
            accountType, 
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });  
        console.log("Yaha tak sb acha hai")
        return res.status(200).json({
            success: true,
            message: "User registered Successfully",
            data : user,
        })

    }
    catch(err){
        console.error(err);
        res.status(400).json({
            success: false,
            message: "User cannot be registered. Please try again"
        })
    }
};

// Login controller for authenticating user
exports.login = async(req, res) => {
    try{
        // fetch email and password from request body
        const {email, password} = req.body;

        // validate input fields
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        // Check User Exist Or Not
        const user = await User.findOne({email : email}).populate("additionalDetails").exec();
        if(!user){
           return res.status(400).json({
                success: false,
                message: "User is not Registered with Us, Please SignUp"
            })
        }

        // Genetare JWT token and compare Password
        if(await bcrypt.compare(password, user.password)){
            // Create Payload for Token
            const payload = {
                email: user.email,
                id: user._id,
                accountType : user.accountType
            }

            // Create JWT token
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"24h"})

            if(!token){
                res.status(400).json({
                    success: false,
                    message: "Erron in Token Generation"
                })
            }

            user.token = token;
            user.password = undefined;     
            // user.confirmPassword = undefined;
            
            // Send response with cookie

            res.cookie("token", token, {expiresIn: Date.now() + 3 * 24 * 60 * 60 * 1000, httpOnly: true}).json({
                success: true,
                token,
                user,
                message:"User Login successfully"
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Password is Incorrect",
            })
        }

    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success: false,
            message: "Login Failure Please Try Agai"
        })
    }
}


// changePassword
exports.changePassword = async(req, res) =>{
    try{
        const {oldPassword, newPassword} = req.body;

        const token = req.body || req.cookie.token || req.header("Authorization").replace("Bearer ", "")
        if(!token){
            return res.status(400).json({
                success: false,
                message: "Token is missing",
            })
        }
         
    
        if(!oldPassword || !newPassword){
            res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        
        const user = await User.findById(req.user.id)

        if( !await bcrypt.compare(oldPassword, user.password)){
            res.status(400).json({
                success: false,
                message : "Old password is incorrect"
            })
        }

        // if(newPassword){
        //     res.status(400).json({
        //         success: false,
        //         message: "New Password does'nt match",
        //     })
        // }

        // Hasing New Password
        const hashPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(req.user.id,
            {password: hashPassword},
            {new: true},
            )

        return res.status(200).json({
            success: true, 
            message: "Password Updated Successfully",
        })
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success: false,
            message: "Something Went wrong in Change Password"
        })
    }
}