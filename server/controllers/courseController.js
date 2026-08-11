import Course from "../models/Course.js";

// @desc   Create a new course
// @route  POST /api/courses
export const createCourse = async (req, res) => {
  try {
    const { title, description, instructor, category, price, thumbnail, duration, level } = req.body;

    if (!title || !description || !instructor || !category) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const course = await Course.create({
      title,
      description,
      instructor,
      category,
      price,
      thumbnail,
      duration,
      level,
      createdBy: req.user?._id, // comes from protect middleware
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("Create Course Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get all courses (supports search via ?keyword=)
// @route  GET /api/courses
export const getAllCourses = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          title: { $regex: req.query.keyword, $options: "i" },
        }
      : {};

    const courses = await Course.find(keyword).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    console.error("Get Courses Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get single course by ID
// @route  GET /api/courses/:id
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Get Course Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Update a course
// @route  PUT /api/courses/:id
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error("Update Course Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Delete a course
// @route  DELETE /api/courses/:id
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.deleteOne();
    res.status(200).json({ message: "Course removed" });
  } catch (error) {
    console.error("Delete Course Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// @desc   Get courses created by logged-in user
// @route  GET /api/courses/my-created
export const getMyCreatedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    console.error("Get My Courses Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};