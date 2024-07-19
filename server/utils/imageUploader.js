const cloudinary = require('cloudinary').v2

exports.uploadImageOnCloudinary = async(folder, file, height, quality)=>{
    try{
        const option = {folder};

        if(quality){
            option.quality = quality;
        }
        if(height){
            option.height = height;
        }
        option.resource_type = "auto";

        return await cloudinary.uploader.upload(file.tempFilePath, option);
             
    }
    catch(error){
        console.log(error);
    }
}