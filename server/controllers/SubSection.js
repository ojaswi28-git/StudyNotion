const SubSection = require("../models/SubSection")
const Section = require("../models/Section");
const {uploadImageOnCloudinary} = require("../utils/imageUploader");

require("dotenv").config();


// Creation Of SubSection
exports.createSubSection = async (req, res) =>{
    try{
        // Fetch Date
        const {title, description, timeDuration, sectionId} = req.body;
        // Fetch File
        const video = req.files.video;
        // Validation
        console.log("Validation Successful");
        if(!title || !description || !sectionId || !video){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        console.log("Second validation success");
        // Upload Video to cloudinary
        const response = await uploadImageOnCloudinary(process.env.FOLDER_NAME, video);
        // Creation Of SubSection
        console.log("upload to cloudinary");
        const newSubSection = await SubSection.create({
            title,
            description,
            timeDuration : `${response.duration}`,
            videoFile: response.secure_url,
        })
        console.log("new section - > ", newSubSection);
        console.log("sectionId -> ", sectionId);
        // Updation Into Section
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
                {
                    $push:{
                        subSection : newSubSection._id,
                    }
                },
                {new: true}
            ).populate("subSection")

        console.log("section Update");
        // Send Success Response
        return res.status(200).json({
            success: true,
            message: "New Sub-section creation successfully",
            data: updatedSection,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong in Sub-Section creation",
            error: error.message,
        })
    }
}


// Updated SubSection Handler
exports.updateSubSection = async (req, res) => {
    try{
        // fetch data
        const { title, description, subSectionId, sectionId} = req.body;
        // fetch file
        const video = req.files.video;
        // Validation
        // if(!title || !description || !timeDuration || !subSectionId || !videoFile){
        //     return res.status(400).json({
        //         success: false,
        //         message: "All fields are required",
        //     })
        // }
        const subSection = await SubSection.findById(subSectionId)

        if(!subSection){
            return res.status(404).json({
                success: false,
                message: "SubSection not Found",
            })
        }
        if(title!==undefined){
            subSection.title = title
        }
        if(description!==undefined){
            subSection.description = description
        }

        if(video !== undefined){
            const uploadDetails = await uploadImageOnCloudinary(
                process.env.FOLDER_NAME,
                video
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }

        await subSection.save();


        // Upload File to cloudinary
        // const response = await uploadImageOnCloudinary(process.env.FOLDER_NAME, videoFile);

        // Update Sub - Section
        const updatedSection = await Section.findById(
            sectionId
        ).populate("subSection").exec();

        // Send success Response
        return res.status(200).json({
            success: true,
            message: "Sub - Section update successfully",
            data: updatedSection,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong in sub-section updation",
            error: error.message,
        })
    }
}



// Sub - Section Deletion Handler
exports.deleteSubSection = async (req, res) => {
    try{
        // Fetch
        const {subSectionId, sectionId} = req.body;

        // Validation
        if(!subSectionId){
            return res.status(400).json({
                success: false,
                message: "Sub Section Id missing",
            })
        }

        await Section.findByIdAndUpdate(
                {_id: sectionId},
                {
                    $pull : {
                        subSection : subSectionId,
                    }
                },
                {new : true}
            )

        // Find and Delete
        await SubSection.findByIdAndDelete(subSectionId);

        // fetch remaining SubSection
        // const remainingSubSection = await SubSection.find({_id : {$ne: subSectionId}},{new:true});

        // Update Section
        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId}).populate("subSection");

        // Return success resposne
        return res.status(200).json({
            success: true,
            message: "sub - section is deleted successfully",
            data: updatedSection,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong in Sub - Section Deletion",
            error: error.message,
        })
    }
}