const db = require("../models/index");

const uploadFile = async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file;
    const { sector } = req.body;

    if (!originalname || !mimetype || !buffer || !sector) {
      return res.status(400).send("All fields are required");
    }

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
    res.send(file.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve file" });
  }
};

const getFilesBySector = async (req, res) => {
  const sectorName = req.params.sectorName;
  try {
    const files = await db.File.findAll({
      where: { sector: sectorName },
      attributes: ["id", "name", "mimeType"],
      order: [["id", "DESC"]],
    });

    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve files" });
  }
};

const deleteFileById = async (req, res) => {
  try {
    const file = await db.File.findByPk(req.params.id);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    await file.destroy();
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete file" });
  }
};

module.exports = {
  uploadFile,
  getFileById,
  getFilesBySector,
  deleteFileById,
};
