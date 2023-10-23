const express = require("express");
const verifyToken = require("../middlewares/verify-token");
const mentor = require("../middlewares/mentor");
const router = express.Router();
const courseHandler = require("./handlers/courses");
const courseIdHandler = require("./handlers/courses/id");

// get all courses
router.get("/", verifyToken, courseHandler.getAllCourses);

// create courses
router.post("/", verifyToken, mentor, courseHandler.createCourses);

// upadate course by id
router.put("/:courseId", verifyToken, mentor, courseIdHandler.editCourseById);

router.get("/:courseId", verifyToken, mentor, courseIdHandler.getCourseById);

router.delete(
  "/:courseId",
  verifyToken,
  mentor,
  courseIdHandler.deleteCourseById
);

module.exports = router;
