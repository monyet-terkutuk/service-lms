const express = require("express");
const verifyToken = require("../middlewares/verify-token");
const mentor = require("../middlewares/mentor");
const router = express.Router();
const challengeHandler = require("./handlers/challenges");

// public access
router.get("/", verifyToken, challengeHandler.getAllChallenges);

// mentor and admin access
router.post("/", verifyToken, mentor, challengeHandler.createChallenges);
router.delete("/:id", verifyToken, mentor, challengeHandler.deleteChallenges);

module.exports = router;
