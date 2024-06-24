const express = require("express");
const multer = require("multer");
const {
  registerUser,
  signInUser,
  refreshToken,
} = require("../controllers/auth.controller");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Registration route
router.post("/sign-up", upload.single("image"), registerUser);

// Signin route
router.post("/sign-in", signInUser);

// Refresh token route
router.post("/refresh-token", refreshToken);

module.exports = router;
