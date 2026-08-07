import express from "express";
import { getDashboard, updateProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, getDashboard);
router.put("/profile", protect, updateProfile);

export default router;