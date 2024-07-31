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

module.exports = {
  getUserData,
  getAllUsers,
  getUserByFederation,
  deleteUserById,
};
