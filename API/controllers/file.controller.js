const db = require("../models/index");

const uploadFile = async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file;
    const { sector } = req.body;
    const file = await db.File.create({
      name: originalname,
      mimeType: mimetype,
      data: buffer,
      sector: sector,
    });
    res.status(201).json({ id: file.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload file" });
  }
};

const getFileById = async (req, res) => {
  try {
    const file = await db.File.findByPk(req.params.id);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    res.setHeader("Content-Type", file.mimeType);
    res.send(file.data); // To send file text content
    res.send(file.data); // To send file binary
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve file" });
  }
};

module.exports = {
  uploadFile,
  getFileById,
};
