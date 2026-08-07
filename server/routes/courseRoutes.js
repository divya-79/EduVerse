import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllCourses);          // GET all courses (public)
router.get("/:id", getCourseById);       // GET single course (public)
router.post("/", protect, createCourse); // CREATE course (login required)
router.put("/:id", protect, updateCourse);   // UPDATE course (login required)
router.delete("/:id", protect, deleteCourse); // DELETE course (login required)

export default router;