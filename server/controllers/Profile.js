const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const {uploadImageOnCloudinary} = require("../utils/imageUploader");
const RatingAndReview = require("../models/RatingAndReview");

// Profile Updation Handler
exports.updateProfile = async (req, res) => {
    try{
        // Fetch user
        const {dateOfBirth="", about="", profession="", contactNumber, gender, firstName, lastName, email} = req.body;

        const userId = req.user.id;

        // validate
        if(!contactNumber || !gender || !userId){
            return res.status(400).json({
                success: false,
                message: "Fill All Required Fields",
            })
        }
        
        // fetch user
        const currentUser = await User.findByIdAndUpdate(userId,
                {
                    firstName,
                    lastName,
                    email,
                },
                {new: true}
            );

        // Fetch profile id
        const profileId = currentUser.additionalDetails;

        // update Profile
        const updatedProfile = await Profile.findByIdAndUpdate(profileId,
                {
                    gender,
                    contactNumber,
                    dateOfBirth,
                    about,
                    profession,
                },
                {new: true}
            )

        const updatedUserDetails = await User.findById(userId).populate("additionalDetails").exec();
        // Send success response
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            updatedUserDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong in profile creation",
            error: error.message,
        })
    }
}


// Profile Deletion Handler

exports.deleteAccount = async (req, res) => {
    try{
        // console.log("Starting Phase");
        const userId = req.user.id;
        // console.log("User Id is ", userId);

        // Fetch user
        const currentUser = await User.findById(userId);

        // console.log("Second Phase \n");
        // console.log("Current User is ", currentUser);
        // Validation
        if(!currentUser){
            return res.status(400).json({
                success: false,
                message: "User is not found",
            })
        }
        // console.log("Current user is ", currentUser);
        const profileId = currentUser.additionalDetails;
        // console.log("Profile id is ", profileId);
        // Delete profile
        await Profile.findByIdAndDelete({_id: profileId});

        for (const courseId of currentUser.courses) {
            await Course.findByIdAndUpdate(
              courseId,
              { $pull: { studentsEnrolled: userId } },
              { new: true }
            )
          };


        
        //   for (const courseId of currentUser.courses) {
        //     const course = await Course.findById(courseId);
        //     if(course){
        //         const ratingAndReviews = course.ratingAndReviews
        //         for(const ratingAndReviewId of ratingAndReviews){
        //             const ratingAndReview = RatingAndReview.findOne({_id: ratingAndReviewId, user: userId})
        //             if(ratingAndReview){

        //                 await Course.findByIdAndUpdate(course._id,
        //                     {
        //                         $pull : {ratingAndReviews : ratingAndReview}
        //                     },
        //                     {new: true}
        //                     )
        //             }
        //         }
        //     }
        //   };

        await RatingAndReview.deleteMany({user : userId})

        // Remove Review
        // const ratingAndReview = await RatingAndReview.findOne({uzser: userId})
        

        // Delete User
        await User.findByIdAndDelete(userId);

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Account Deleted Successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong in profile Deletion",
            error: error.message,
        })
    }
}


// Getting all user details handler
exports.getAllUserDetails = async (req, res) =>{
    try{
        const userId = req.user.id;

        console.log("User Id is ", userId);
        // Fetch user and validation
        const currentUser = await User.findById(userId)
            .populate("additionalDetails")
            .exec();
        // const userDetails = await User.findById(userId)
		// 	.populate("additionalDetails")
		// 	.exec();

        
        // Send success response
        return res.status(200).json({
            success: true,
            message: "User Detail fetched successfully",
            data: currentUser,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong in fetching user details",
            error: error.message,
        })
    }
}

// Update Display Profile

exports.updateDisplayProfile = async(req, res) =>{
    try{
        // Fetch Image from request
        const displayPicture = req.files.displayPicture;
        
        // Fetch user id 
        const userId = req.user.id;

        // validate image
        if(!displayPicture){
            return res.status(400).json({
                success: false,
                message: "Upload Valid Image"
            })
        }

        // upload image to cloudinary
        const image = await uploadImageOnCloudinary(process.env.FOLDER_NAME, displayPicture);

        console.log("Imame obj is ", image);
        // update user profile
        const updatedProfile = await User.findByIdAndUpdate(userId,
                {
                    image: image.secure_url,
                },
                {new: true}
            ).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            data: updatedProfile,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// Get User Enroller Courses

exports.getEnrolledCourses = async (req, res) =>{
    try{
        // Fetch User Id from request Object
        console.log("Sab theek ")
        const userId = req.user.id;
        console.log(userId);
        console.log("Sab theek 2")

        // Fetct User Details 
        // const userDetails = await User.findById({_id: userId}).populate("courses").exec();
        const userDetails = await User.findById(userId)
        .populate({
            path : "courses",
            populate : {
                path : "courseContent",
                populate : {
                    path : "subSection"
                }
            }
        })
        .exec();
        console.log(userDetails)
        console.log("Sab theek 3");
        // validate userDetails
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userId}`,
            })
        }
        
        console.log("Sab theek hai dost 1");

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


exports.instructorDashboard = async (req, res) => {
    try {
      const courseDetails = await Course.find({ instructor: req.user.id })
  
      const courseData = courseDetails.map((course) => {
        const totalStudentsEnrolled = course.studentsEnrolled.length
        const totalAmountGenerated = totalStudentsEnrolled * course.price
  
        // Create a new object with the additional fields
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          // Include other course properties as needed
          totalStudentsEnrolled,
          totalAmountGenerated,
        }
  
        return courseDataWithStats
      })
  
      res.status(200).json({ courses: courseData })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server Error" })
    }
  }







