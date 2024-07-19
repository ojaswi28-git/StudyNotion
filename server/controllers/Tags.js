const Tag = require("../models/Tags");

// Handler of Tag Creation

exports.createTag = async(req, res) => {
    try{
        // Fetch Data from Request Body
        const {name, discription} = req.body;

        // Validation
        if(!name || !discription){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        // Create tag enrty into database
        const newTag = await Tag.create({name, discription});

        return res.status(200).json({
            success: false,
            message: "Tag created successfully",
            date: newTag,
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// show all tag handler

exports.showAllTags = async(req, res) =>{
    try{
        const allTags = await Tag.find({},{name: true, discription: true});

        // Validate
        if(!allTags){
            return res.status(400).json({
                success: false,
                message: "Any tag is not found",
            })
        }

        // return success response
        return res.status(200).json({
            success: true,
            data: allTags,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}