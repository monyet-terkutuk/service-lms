const express = require("express");
const router = express.Router();
const userHandler = require("./handlers/users");
const userIdHandler = require("./handlers/users/id");

// Get all users data
router.get("/", userHandler.get);

// Create a user data
router.post("/", userHandler.post);

// Get user by id
router.get("/:userId", userIdHandler.get);

// Edit user by id
router.put("/:userId", userIdHandler.put);

// Delete user by id
router.delete("/:userId", userIdHandler.delete);

module.exports = router;
