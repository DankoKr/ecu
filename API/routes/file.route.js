const express = require("express");
const multer = require("multer");
const { uploadFile, getFileById } = require("../controllers/file.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { adminAuth } = require("../middlewares/adminAuth.middleware");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Route to upload file only when user is ADMIN
router.post(
  "/upload",
  verifyToken,
  adminAuth,
  upload.single("file"),
  uploadFile
);

// Route to get file by id
router.get("/files/:id", verifyToken, getFileById);

module.exports = router;
