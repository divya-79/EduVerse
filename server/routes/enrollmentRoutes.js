import express from "express";
import {
  enrollInCourse,
  getMyEnrollments,
  updateEnrollment,
} from "../controllers/enrollmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:courseId", protect, enrollInCourse);
router.get("/my-courses", protect, getMyEnrollments);
router.put("/:id", protect, updateEnrollment);

export default router;