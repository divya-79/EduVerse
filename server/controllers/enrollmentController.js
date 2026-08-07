import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

// @desc   Enroll logged-in user in a course
// @route  POST /api/enrollments/:courseId
export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const alreadyEnrolled = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
    });
    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: courseId,
    });

    res.status(201).json(enrollment);
  } catch (error) {
    console.error("Enroll Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get logged-in user's enrolled courses
// @route  GET /api/enrollments/my-courses
export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id }).populate("course");
    res.status(200).json(enrollments);
  } catch (error) {
    console.error("Get Enrollments Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Update progress/status of an enrollment
// @route  PUT /api/enrollments/:id
export const updateEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    if (enrollment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Enrollment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error("Update Enrollment Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};