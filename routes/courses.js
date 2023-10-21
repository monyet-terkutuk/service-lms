const express = require("express");
const verifyToken = require("../middlewares/verify-token");
const mentor = require("../middlewares/mentor");
const router = express.Router();

// create courses
router.post("/", verifyToken, mentor, userHandler.createUser);

module.exports = router;
