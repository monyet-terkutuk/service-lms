const express = require("express");
const router = express.Router();
const userHandler = require("./handlers/users");
const userIdHandler = require("./handlers/users/id");
const verifyToken = require("../middlewares/verify-token");
const admin = require("../middlewares/admin");

// Get all users data
router.get("/", verifyToken, admin, userHandler.getAllUsers);

// Create a user data
router.post("/", verifyToken, admin, userHandler.createUser);

// router
//   .route("/")
//   .get(verifyToken, userHandler.getAllUsers)
//   .post(userHandler.createUser);

// Get user by id
router.get("/:userId", verifyToken, admin, userIdHandler.getUserById);

// Edit user by id
router.put("/:userId", verifyToken, userIdHandler.editUserById);

// Delete user by id
router.delete("/:userId", verifyToken, admin, userIdHandler.deleteUserById);

module.exports = router;
