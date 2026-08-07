import User from "../models/User.js";
import Enrollment from "../models/Enrollment.js";

// @desc   Get logged-in user's dashboard summary
// @route  GET /api/users/dashboard
export const getDashboard = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id }).populate("course");

    const totalCourses = enrollments.length;
    const completedCourses = enrollments.filter((e) => e.status === "completed").length;
    const inProgressCourses = enrollments.filter((e) => e.status === "in-progress").length;

    res.status(200).json({
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
      totalCourses,
      completedCourses,
      inProgressCourses,
      enrollments,
    });
  } catch (error) {
    console.error("Dashboard Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Update logged-in user's profile
// @route  PUT /api/users/profile
export const updateProfile = async (req, res) => {
  try {
    const { name, university, course, semester } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.university = university ?? user.university;
    user.course = course ?? user.course;
    user.semester = semester ?? user.semester;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      university: updatedUser.university,
      course: updatedUser.course,
      semester: updatedUser.semester,
    });
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};