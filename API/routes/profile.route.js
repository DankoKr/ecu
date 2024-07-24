const express = require("express");
const {
  fetchUserData,
  fetchAllUsers,
} = require("../controllers/profile.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { adminAuth } = require("../middlewares/adminAuth.middleware");

const router = express.Router();

// Route to fetch user profile info
router.get("/profile", verifyToken, fetchUserData);

// Route to fetch all users
router.get("/users", verifyToken, adminAuth, fetchAllUsers);

module.exports = router;
