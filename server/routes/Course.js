const express = require("express");
const router = express.Router();

const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getFullCourseDetails,
    editCourse,
    getInstructorCourses,
    deleteCourse
} = require("../controllers/Course")


const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/Section");


const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controllers/SubSection");

const {
    createCategory,
    showAllCategories,
    categoryPageDetails,
} = require("../controllers/Category")

const { createRating, getAverageRating, getAllRating } = require("../controllers/RatingAndReview")


// Middlewares
const { auth, isAdmin, isStudent, isInstructor } = require("../middlewares/auth");
const { updateCourseProgress } = require("../controllers/CourseProgress");

// 
/* ********************************************************************************* */
//                                Course Routes
/* ********************************************************************************* */

// Course can only be  create by Instructor
router.post("/createCourse", auth, isInstructor, createCourse);
// Add Section to a courese
// router.post("/addSection", aut)
router.post("/addSection", auth, isInstructor, createSection);
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection);
// Delete a section
router.post("/deleteSection", auth, isInstructor, deleteSection);

// Add sub-section to a section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Update a sub-section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete a sub-section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
// Get all register courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a specific Courses
router.post("/getCourseDetails", getCourseDetails)
router.post("/getFullCourseDetails", auth, getFullCourseDetails)

// Edit course routes
router.post("/editCourse", auth, isInstructor, editCourse)
// Get all courses under a specific instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Delete a course
router.delete("/deleteCourse", deleteCourse)
//
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)




/* ********************************************************************************* */
//                           Category Routes (Only by Admin)
/* ********************************************************************************* */

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

/* ********************************************************************************* */
//                       Rating and Review Routes (Only by Student)
/* ********************************************************************************* */
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)


module.exports = router