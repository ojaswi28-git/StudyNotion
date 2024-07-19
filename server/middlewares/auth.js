const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User")

exports.auth = async(req, res, next)=>{
    try{
        // extract token
        const token = req.body.token || req.cookies.token || req.header("AuthoriZation").replace("Bearer ", "");
        

        // console.log("token is ", token); 
        // If token missing, then return response
        if(!token){
            return res.status(400).json({
                success: false,
                message: "Token is missing",
            })
        }

        // verify the token
        try{
            console.log("Auth Start")
            const decode =  jwt.verify(token, process.env.JWT_SECRET)
            console.log("authuser", decode);
            // console.log(decode)
            req.user = decode;
        }
        catch(error){
            // verification Issue
            return res.status(400).json({
                success: false,
                message: error.message,
            })
        }
        next();
    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: "Something Went Worng in auth middleware",
        })
    }
}

// isStudent 
exports.isStudent = async (req, res, next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(400).json({
                success: false,
                message: "This is a protected route only for Students"
            })
        }
        next();
    }
    catch(error){
        return res.status(400).json({
            success: false,
            message: "User role cannot be verified",
        })
    }
}


// isInstuctor
exports.isInstructor = async (req, res, next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(400).json({
                success: false,
                message: "This is a protected route only for Instuctor"
            })
        }
        next();
    }
    catch(error){
        return res.status(400).json({
            success: false,
            message: "User role cannot be verified",
        })
    }
}


// is Admin 
exports.isAdmin = async (req, res, next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(400).json({
                success: false,
                message: "This is a protected route only for Admin"
            })
        }
        next();
    }
    catch(error){
        return res.status(400).json({
            success: false,
            message: "User role cannot be verified",
        })
    }
}