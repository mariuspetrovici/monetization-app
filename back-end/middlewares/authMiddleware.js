const jwt = require("jsonwebtoken");

const { User } = require("../models");

exports.authMiddleware =
  (requiredRoles = [], skipVerify = false) =>
  async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);

      if (!user) {
        return res
          .status(401)
          .json({ message: "Authentication failed: User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
