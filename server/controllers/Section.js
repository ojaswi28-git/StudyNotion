const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection")


// Create Section Handler

exports.createSection = async(req, res)=>{
    try{
        // fetch data
        const {sectionName, courseId} = req.body;
        // validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message : "All fields are reuired",
            })
        }
        // Creation
        const newSection = await Section.create({sectionName});
        // updation into course
        const updatedCourse = await Course.findByIdAndUpdate(courseId,
                {
                    $push: {
                        courseContent : newSection._id,
                    }
                },
                {new:true}
            )
            .populate(
                {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                }
            ).exec();
        // Send success response
        return res.status(200).json({
            success: true,
            message: "New Section Creation Successfully",
            data : updatedCourse
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong in Section creation",
            error: error.message,
        })
    }
}


// Update Section Handler

exports.updateSection = async(req, res)=>{
    try{
        // Fetch
        const {sectionName, sectionId, courseId} = req.body;
        // Validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success: false,
                message: "Section Id is missing",
            })
        }
        // Updation
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
                {sectionName},
                {new: true},
            )

        // updated course
        const updatedCourse = await Course.findById(courseId)
        .populate({
            path: "courseContent",
            populate : {
                path : "subSection",
            },
        }).exec();
        
        // Success Response
        return res.status(200).json({
            success: true,
            message: "Section Updated Successfully",
            data: updatedCourse,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong in Section Updation",
            error: error.message,
        })
    }
}


// Delete Section Handler

exports.deleteSection = async(req, res)=>{
    try{
        // fetch
        const {sectionId, courseId} = req.body;
        // Validation

        await Course.findByIdAndUpdate(
            courseId,
            {
                $pull : {
                    courseContent : sectionId,
                }
            },
            {new: true}
        )

        // Fetch section
        const currentSection = await Section.findById(sectionId);
        if(!currentSection){
            return res.status(404).json({
                success: false,
                message : "Section is not found",
            })
        }

        // if(!sectionId || !courseId){
        //     return res.status(400).json({
        //         success: false,
        //         message: "SectionID missing",
        //     })
        // }

        // console.log("Validation of DAta");
        // // Perform Deletion
        // const section = await Section.findById({_id: sectionId})

        // for(const subSectionId of section){
        //     await SubSection.findByIdAndDelete(subSectionId);
        // }

        // console.log("Delete all subSections")

        // await Section.findOneAndDelete(sectionId);

        // console.log("Delete section")
        // // Remaining Section
        // const remainingSection = await Section.find({_id:{ $ne: sectionId }});


        // Delete All Sub Section
        await SubSection.deleteMany({_id: {$in: currentSection.subSection}})
        // Delete the section
        await Section.findByIdAndDelete(sectionId);
        // Fetch course and Update
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId
        )
        .populate({
            path: "courseContent",
            populate: {
                path : "subSection"
            }
        }).exec();

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Section is deleted successfully",
            data: updatedCourse,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong in section Deletion",
            error: error.message,
        })
    }
}