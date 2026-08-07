import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // Token usually comes as: Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // 1. Extract token from header
      token = req.headers.authorization.split(" ")[1];

      // 2. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Get user from token payload (exclude password) and attach to req
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      // 4. Move to the next middleware/controller
      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error.message);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};