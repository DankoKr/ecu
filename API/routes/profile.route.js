const express = require("express");
const {
  getUserData,
  getAllUsers,
  getUserByFederation,
  deleteUserById,
  updateUserById,
} = require("../controllers/profile.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { adminAuth } = require("../middlewares/adminAuth.middleware");

const router = express.Router();

// Route to fetch user profile info
router.get("/profile", verifyToken, getUserData);

// Route to fetch all users
router.get("/users", verifyToken, getAllUsers);

// Route to fetch user by federation
router.get(
  "/users/federation/:federation",
  verifyToken,
  adminAuth,
  getUserByFederation
);

// Route to delete user by id
router.delete("/users/:id", verifyToken, adminAuth, deleteUserById);

// Route to update user by id
router.put("/users/:id", verifyToken, adminAuth, updateUserById);

module.exports = router;
