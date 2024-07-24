const db = require("../models/index");
const fetchUserData = async (req, res) => {
  const user = await db.User.findOne({
    where: { id: req.user.id },
    attributes: {
      exclude: ["password", "username"],
    },
  });
  res.send(user);
};

const fetchAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: {
        exclude: ["password", "image", "role", "username"], // Exclude sensitive fields
      },
    });
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
};

module.exports = {
  fetchUserData,
  fetchAllUsers,
};
