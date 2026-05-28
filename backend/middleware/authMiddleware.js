const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect Route: Validates JWT token and appends authenticated user details to req.user
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Decode/Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user details excluding password hash
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          message: "User not found. Authorization failed.",
        });
      }

      next();
    } catch (error) {
      console.error("JWT verification failed:", error.message);
      return res.status(401).json({
        message: "Not authorized. Session token is invalid or expired.",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized. Missing session token.",
    });
  }
};

// Admin Guard: Ensures that the user possesses administrative permissions
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Access denied. Administrative permissions required.",
    });
  }
};

module.exports = { protect, admin };
