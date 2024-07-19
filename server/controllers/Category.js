// const { getRandomValues } = require("crypto");
const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
// Create Category

exports.createCategory = async(req, res) =>{
    try{
        // fetch data
        const {name, description} = req.body;

        // validation
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        // check if Category is already present in db
        const checkEntry = await Category.findOne({name: name}, {description: description});
        console.log("Check Entry is ",checkEntry);
        if(checkEntry){
            return res.status(400).json({
                success: false,
                message: "Category is already present"
            })
        }

        // create entery into db
        const newCategory = Category.create({name, description});

        // return Success response
        return res.status(200).json({
            success: true,
            message: "New Tag Creation Successfull",
            newCategory,
        })

    }
    catch(error){
        console.log("Error in Tag creation", error);
        return res.status(400).json({
            success: false,
            message: "Something Went Wrong In Category Creation"
        })
    }
}


// Get all Category

exports.showAllCategories = async(req, res) =>{
    try{
        // Fetch all Category from db
        const allCategory = await Category.find({},{
                                                name: true, 
                                                description:true   
                                            })

        // Validation
        if(!allCategory){
            return res.status(400).json({
                success: false,
                message: "Any Category is not present in db"
            })
        }

        // Return response
        return res.status(200).json({
            success: true,
            message: "All Category fetched successfully",
            data: allCategory,
        })
                                            
    }
    catch(error){
        return res.status(400).json({
            success: false,
            message: "something went wrong on fecthing Category"
        })
    }
}


// categoryPageDetails

exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.course.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "course",
          match: { status: "Published" },
        })
        .exec()
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }