const db = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createToken, verifyExpiration } = db.authToken;

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const image = req.file;

    // Validate required fields
    if (!name || !email || !password || !role || !image) {
      return res.status(400).send("All fields are required");
    }

    // Check if the email exists
    const userExists = await db.User.findOne({
      where: { email },
    });
    if (userExists) {
      return res
        .status(400)
        .send("Email is already associated with an account");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Convert image file to Buffer
    const imageBuffer = Buffer.from(image.buffer);

    await db.User.create({
      name,
      role,
      email,
      password: hashedPassword,
      image: imageBuffer, // Store image as Buffer (BLOB)
    });

    return res.status(201).send("Registration successful");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error in registering user");
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json("Email not found");
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json("Incorrect email and password combination");
    }

    let imageBase64 = null;
    if (user.image) {
      // Convert hex string to Buffer and then to Base64
      const imageBuffer = Buffer.from(user.image.toString("hex"), "hex");
      imageBase64 = imageBuffer.toString("base64");
    }

    // Authenticate user with jwt
    const accessToken = jwt.sign(
      { id: user.id, userRole: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );

    const refreshToken = await createToken(user);

    res.status(200).send({
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
      image: imageBase64,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Sign in error");
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    return res.status(403).send("Refresh Token is required!");
  }

  try {
    let storedRefreshToken = await db.authToken.findOne({
      where: { token: requestToken },
    });

    if (!storedRefreshToken) {
      return res.status(403).send("Invalid refresh token");
    }

    if (verifyExpiration(storedRefreshToken)) {
      db.authToken.destroy({ where: { id: storedRefreshToken.id } });
      return res
        .status(403)
        .send("Refresh token has expired. Please make a new sign in request");
    }

    const user = await db.User.findOne({
      where: { id: storedRefreshToken.user },
      attributes: {
        exclude: ["password"],
      },
    });

    const newAccessToken = jwt.sign(
      { id: user.id, userRole: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: storedRefreshToken.token,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  registerUser,
  signInUser,
  refreshToken,
};
