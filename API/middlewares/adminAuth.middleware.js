const adminAuth = (req, res, next) => {
  // Check if req.user exists (set by verifyToken middleware)
  if (!req.user || !req.user.userRole) {
    return res
      .status(403)
      .send({ message: "Unauthorized! No user information found." });
  }

  // Check if userRole is ADMIN
  if (req.user.userRole !== "ADMIN") {
    return res
      .status(403)
      .send({ message: "Unauthorized! ADMIN role required." });
  }

  // If userRole is ADMIN, proceed to next middleware or route handler
  next();
};

module.exports = {
  adminAuth,
};
