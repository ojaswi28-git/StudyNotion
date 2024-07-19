const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const User = require("../models/User")
const Category = require("../models/Category")
const CourseProgress = require("../models/CourseProgress")
const {uploadImageOnCloudinary} = require("../utils/imageUploader");
const {convertSecondsToDuration} = require("../utils/secToDuration")


// Function to Create new Course

exports.createCourse = async(req, res) =>{
    try{

        // Get user ID from request object
        const userId = req.user.id;

        // Fetch all data from body of request
        let{
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            category,
            status,
            instructions,
        } = req.body;

        // Fetch thmbnail image from file of request
        const thumbnail = req.files.thumbnailImage;

        // Validation
        if(
            !courseName || 
            !courseDescription || 
            !whatYouWillLearn || 
            !price || 
            !tag || 
            !thumbnail ||
            !category
        ){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        if(!status || status === undefined){
            status = "Draft";
        }

        // Check if the user is an instructor
        const instructorDetails = await User.findById(userId,{accountType: "Instructor"});

        // Validate Instruction
        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message : "Instructor Details Not Found",
            })
        }

        // Check if the category is valid
        const categoryDetails = await Category.findOne({_id: category});
        if(!categoryDetails){
            return res.status(400).json({
                success: false,
                message: "Category Details Not Found",
            })
        }

        // const checkTag = await Category.findById(tag);

        // if(!checkTag){
        //     return res.status(400).json({
        //         success: false,
        //         message: "Tag not found"
        //     })
        // }

        // const instructor = req.user.id;
        // if(!instructor){
        //     return res.status(400).json({
        //         success: false,
        //         message: "Instructor Not Found"
        //     })
        // }

        const newImage = await uploadImageOnCloudinary( 
            process.env.FOLDER_NAME,
            thumbnail
        );

        // create entry of course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor : instructorDetails._id,
            whatYouWillLearn,
            price,
            thumbnail: newImage.secure_url,
            tag: JSON.parse(tag),
            category: categoryDetails._id,
            status: status,
            instructions: JSON.parse(instructions),
        })

        // update user
        const updatedUser = await User.findByIdAndUpdate({_id : instructorDetails._id},
            {
                $push :{ 
                    courses: newCourse._id
                }
            }
            );


        // Update Category
        const updateCategory = await Category.findByIdAndUpdate(category,
             {
                $push :{
                    course: newCourse._id,
                }
             })

        return res.status(200).json({
            success: true,
            message: "New Course Creation is successfull",
            data: newCourse,
        })
        
    }
    catch(error){
        console.log("Error in course creation", error);
        return res.status(400).json({
            success: false,
            message: "something went worng in course creation",
        })
    }
}

exports.editCourse = async(req,res) =>{
    try{
        const {courseId} = req.body;
        const updates = req.body;
        
        // fetch course 
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({
                message : "Course not found"
            })
        }
        if(req.files){
            console.log("Thumbnail update")
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageOnCloudinary(
                process.env.FOLDER_NAME,
                thumbnail
                )
                course.thumbnail = thumbnailImage.secure_url
            }
            // updates only the fields that are present in the request body
            for(const key in updates){
                if(updates.hasOwnProperty(key)){
                    if(key === "tag" || key === "instructions"){
                        course[key] = JSON.parse(updates[key]);
                    } else {
                        course[key] = updates[key];
                    }
                }
            }
        await course.save();
        const updatedCourse = await Course.findOne({
            _id : courseId,
        })
        .populate({
            path: "instructor",
            populate : {
                path : "additionalDetails",
            },
        })
        .populate('category')
        .populate("ratingAndReviews")
        .populate({
            path : "courseContent",
            populate:{
                path : "subSection"
            },
        })
        .exec();

        return res.status(200).json({
            success: true,
            message : "Course updated successfully",
            data : updatedCourse,
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}


// Get all courses

exports.getAllCourses = async(req, res)=>{
    try{
        const allCourses = await Course.find(
            { status: "Published"},
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnrolled: true,
            }
        ).populate("instructor").populate("courseContent").exec();

        // validation
        if(!allCourses){
            return res.status(400).json({
                success: false,
                message: "Courses Not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Courses fecthed successfully",
            data: allCourses,
        })

    }
    catch(error){
        console.log("Error in fetching courses ", error);
        return res.status(400).json({
            status: false,
            message: error.message,
        })
    }
}

exports.getCourseDetails = async(req, res) => {
    try{
        const {courseId} = req.body;

        // Fetch course from db
        const courseDetails = await Course.findOne({
            _id : courseId,
        })
        .populate({
            path: "instructor",
            populate : {
                path : "additionalDetails",
            },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path : "courseContent",
            populate : {
                path : "subSection",
                // select : "videoUrl",
            }
        })
        .exec()


        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : `Could not find course with id: ${courseId}`,
            })
        }

        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content) =>{
            content.subSection.forEach((subSection) =>{
                const timeDurationInSeconds = parseInt(subSection.timeDuration);
                totalDurationInSeconds += timeDurationInSeconds;
            })
        })
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
        
        return res.status(200).json({
            success: true,
            data:{
                courseDetails,
                totalDuration,
            },
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate : {
            path : "subSection",
          },
        })
        .exec()
  
        
        console.log("Full course details")
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }



exports.getInstructorCourses = async (req, res) =>{
    try{

        const instructorId = req.user.id;

        const instructorCourses = await Course.find({
            instructor : instructorId,
        }).sort({createdAt: -1})


        res.status(200).json({
            success: true,
            data : instructorCourses,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to retrive instructor courses",
            error: error.message,
        })
    }
}

exports.deleteCourse = async(req,res) => {
    try{
        const { courseId, categoryId } = req.body;

        // Find the course
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                message: "Course not found",
            })
        }

        // remove course from category
        await Category.findByIdAndUpdate(categoryId,
            {
                $pull : {
                    course : courseId,
                }
            },
            {new: true}
        )

        // remove enrolled students from the course
        const studentsEnrolled = course.studentsEnrolled;
        for (const studentId of studentsEnrolled){
            await User.findByIdAndUpdate(studentId, {
                $pull : { courses : courseId }
            })
        }

        // Delete Sections and subSections
        const courseSection = course.courseContent;
        for ( const sectionId of courseSection ){
            const section = await Section.findById(sectionId);
            if(section){
                const subSections = section.subSection;
                for( const subSectionId of subSections ){
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }
            await Section.findByIdAndDelete(sectionId);
        }
        
        // Delete the course
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success: true,
            message: "Course Deleted Successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Server error ",
            error : error.message,
        })
    }
}