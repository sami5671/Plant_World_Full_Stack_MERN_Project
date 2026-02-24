const { apiResponse } = require("../helpers");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const verifyRoles = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return apiResponse(res, 401, false, "Unauthorized");
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);
      if (!user) {
        return apiResponse(res, 404, false, "User not found");
      }

      if (!allowedRoles.includes(user.role)) {
        return apiResponse(res, 403, false, `Forbidden: Requires ${allowedRoles.join(", ")} role(s)`);
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      return apiResponse(res, 401, false, "Invalid or expired token");
    }
  };
};

module.exports = { verifyRoles };
