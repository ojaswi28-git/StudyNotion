const express = require("express");
const router = express.Router();

const {
    updateProfile,
    deleteAccount,
    updateDisplayProfile,
    getAllUserDetails,
    getEnrolledCourses,
    instructorDashboard,
} = require("../controllers/Profile");

// Middleware
const {auth, isInstructor} = require("../middlewares/auth");

// ********************************************************************************************************
//                   Profile routes
// ********************************************************************************************************

router.put("/updateProfile", auth, updateProfile);
router.put("/updateDisplayProfile", auth, updateDisplayProfile);
router.delete("/deleteProfile", auth, deleteAccount);
router.get("/getAllUserDetails", auth, getAllUserDetails);
router.get("/getEnrolledCourses", auth,  getEnrolledCourses);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router;