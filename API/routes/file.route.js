const express = require("express");
const multer = require("multer");
const {
  uploadFile,
  getFileById,
  getFilesBySector,
  deleteFileById,
} = require("../controllers/file.controller");
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

// Route to get all files for a given sector
router.get("/files/sector/:sectorName", verifyToken, getFilesBySector);

// Route to delete file by id
router.delete("/files/:id", verifyToken, adminAuth, deleteFileById);

module.exports = router;
