const db = require("../models/index");
const getUserData = async (req, res) => {
  const user = await db.User.findOne({
    where: { id: req.user.id },
    attributes: {
      exclude: ["password", "username"],
    },
  });
  res.send(user);
};

const getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: {
        exclude: ["password", "image", "role", "username"], // Exclude sensitive fields
      },
      where: {
        role: { [db.Sequelize.Op.ne]: "ADMIN" }, // Exclude users with userRole = ADMIN
      },
      order: [["country", "ASC"]],
    });
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
};

const getUserByFederation = async (req, res) => {
  const federation = req.params.federation;
  try {
    const user = await db.User.findOne({
      where: { federation: federation },
      attributes: {
        exclude: ["password", "username", "image"],
      },
    });
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

const updateUserById = async (req, res) => {
  console.log(req);
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get the fields that are provided in req.body and update only those
    const updatedData = {};
    const allowedFields = ["name", "website", "federation", "country"]; // Example allowed fields

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updatedData[field] = req.body[field];
      }
    });

    // If no valid fields to update are passed, return an error
    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    // Update only the fields that exist in updatedData
    await user.update(updatedData);

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserData,
  getAllUsers,
  getUserByFederation,
  deleteUserById,
  updateUserById,
};
