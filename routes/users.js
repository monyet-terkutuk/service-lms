const express = require("express");
const router = express.Router();
const userHandler = require("./handlers/users");
const userIdHandler = require("./handlers/users/id");
const verifyToken = require("../middlewares/verify-token");

// Get all users data
router.get("/", userHandler.getAllUsers);

// Create a user data
router.post("/", userHandler.createUser);

// router
//   .route("/")
//   .get(verifyToken, userHandler.getAllUsers)
//   .post(userHandler.createUser);

// Get user by id
router.get("/:userId", verifyToken, userIdHandler.getUserById);

// Edit user by id
router.put("/:userId", userIdHandler.editUserById);

// Delete user by id
router.delete("/:userId", userIdHandler.deleteUserById);

module.exports = router;
