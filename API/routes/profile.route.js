const express = require("express");
const {
  getUserData,
  getAllUsers,
  getUserByFederation,
  deleteUserById,
} = require("../controllers/profile.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { adminAuth } = require("../middlewares/adminAuth.middleware");

const router = express.Router();

// Route to fetch user profile info
router.get("/profile", verifyToken, getUserData);

// Route to fetch all users
router.get("/users", verifyToken, adminAuth, getAllUsers);

// Route to fetch user by federation
router.get(
  "/users/federation/:federation",
  verifyToken,
  adminAuth,
  getUserByFederation
);

// Route to delete user by id
router.delete("/users/:id", verifyToken, adminAuth, deleteUserById);

module.exports = router;
