const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");

// Reset password token
exports.resetPasswordToken = async(req, res) =>{
    try{

        console.log("step 1");
        // fetch email from request body
        const {email} = req.body;
        
        console.log("step 2");
        // validation

        if(!email){
            res.status(400).json({
                success: true,
                message: "Please enter your email id",
            })
        }

        console.log("step 3");
        // Check valid email id or not
        const user = await User.findOne({email : email});

        console.log("step 4");
        console.log("user -> ", user);
        if(user === null){
            return res.stauts(400).json({
                success: false,
                message: "This email is not registered with us, please register yourself first",
            })
        }

        console.log("step 5");
        // create token for reserPassword
        const token = crypto.randomUUID();
        console.log("reset token", token);
        

        const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				token: token,
				resetPasswordExpires: Date.now() + 5 * 60 * 1000,
			},
			{ new: true }
		);
		console.log("DETAILS", updatedDetails);

        // const updateDetails = await User.findOneAndUpdate({email: email},
        //     {   
        //         token : token,
        //         resetPasswordExpires : Data.now() + ,
        //     },
        //     {new: true}
        //     )
            
        // const url = `http://localhost:3000/update-password/${token}`;
        const url = `https://studynotion-by-virender.vercel.app/update-password/${token}`
        console.log("Reset password url ", url);
            
        mailSender(email, "Reset Password Link", `Password Reset Link : ${url}`);

        return res.status(200).json({
            success: true,
            message: "Reset password link has send successfully",
        })

    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Something went wrong in reset Password Token generate",
        })
    }
}

// Reset Password

exports.resetPassword = async(req, res) =>{
    try{
        // const { password, confirmPassword } = req.body;
        const { password, confirmPassword, token } = req.body;
        
    
        if(!password || !confirmPassword){
            return res.status(400).json({
                success: false,
                message: "All fields are require",
            })
        }

        if(password !== confirmPassword){
            return res.stauts(400).json({
                success: false,
                message: "Password doesn't Match",
            })
        }

        const user = await User.findOne({token: token});

        console.log("Current User ", user);

        if(!user){
            return res.status(400).json({
                success: false,
                message: "token is invalid"
            })
        }

        // check token validation
        if(!(user.resetPasswordExpires > Date.now())){
            return res.status(400).json({
                success: false,
                message: "Password reset link is expires",
            })
        }

        
        // Hashing password
        const hashPassword = await bcrypt.hash(password, 10);
        
        console.log("Second Phase Done ");
        const userDetails = await User.findOneAndUpdate(
            {token : token},
            {password : hashPassword},
            {new: true}
        )
            console.log("Third Phase Done ", userDetails);
        return res.status(200).json({
            success: true,
            message: "Password has been reset successfully",
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}