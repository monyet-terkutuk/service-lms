const express = require("express");
const verifyToken = require("../middlewares/verify-token");
const mentor = require("../middlewares/mentor");
const router = express.Router();
const courseHandler = require("./handlers/courses");
const courseIdHandler = require("./handlers/courses/id");
const upload = require("../config/fileUpload");

// public access
router.get("/", verifyToken, courseHandler.getAllCourses);
router.get("/:courseId", verifyToken, courseIdHandler.getCourseById);

// mentor and admin access
router.post("/", verifyToken, mentor, courseHandler.createCourses);

router.post(
  "/upload/:courseId",
  verifyToken,
  mentor,
  courseIdHandler.uploadImageByCourseId
);

router.put("/:courseId", verifyToken, mentor, courseIdHandler.editCourseById);

router.delete(
  "/:courseId",
  verifyToken,
  mentor,
  courseIdHandler.deleteCourseById
);

module.exports = router;
