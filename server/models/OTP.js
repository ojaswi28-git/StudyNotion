const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate")

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    otp:{
        type: String,
        required:true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: 5*60,
    },
})


// Function to send email
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification Email from StudyNotion", emailTemplate(otp));
        console.log(mailResponse);
    }
    catch(err){
        console.log("Error in sending otp",err);
        throw err;
    }
}

OTPSchema.pre("save", async function(next){
    sendVerificationEmail(this.email, this.otp);
    next();
})



module.exports = mongoose.model("OTP", OTPSchema);