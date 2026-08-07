import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    progress: {
      type: Number, // percentage 0-100
      default: 0,
    },
    status: {
      type: String,
      enum: ["enrolled", "in-progress", "completed"],
      default: "enrolled",
    },
  },
  { timestamps: true }
);

// Prevent the same user from enrolling in the same course twice
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;