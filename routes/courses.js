const express = require("express");
const verifyToken = require("../middlewares/verify-token");
const mentor = require("../middlewares/mentor");
const router = express.Router();
const courseHandler = require("./handlers/courses");

// get all courses
router.get("/", verifyToken, courseHandler.getAllCourses);

// create courses
router.post("/", verifyToken, mentor, courseHandler.createCourses);

module.exports = router;
