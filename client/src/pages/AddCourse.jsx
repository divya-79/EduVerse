import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function AddCourse() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    category: "",
    price: 0,
    level: "Beginner",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/courses", formData);
      setSuccess("Course added successfully! 🎉");
      setFormData({
        title: "",
        description: "",
        instructor: "",
        category: "",
        price: 0,
        level: "Beginner",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Could not add course.");
    } finally {
      setLoading(false);
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h2>Please Log In</h2>
          <p>You need to be logged in to add a course.</p>
          <button onClick={() => navigate("/login")}>Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create a Course</h2>
        <p>Share your knowledge with EduVerse learners.</p>

        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input name="title" value={formData.title} onChange={handleChange} required />

          <label>Description</label>
          <input name="description" value={formData.description} onChange={handleChange} required />

          <label>Instructor Name</label>
          <input name="instructor" value={formData.instructor} onChange={handleChange} required />

          <label>Category</label>
          <input name="category" value={formData.category} onChange={handleChange} required />

          <label>Price (0 for Free)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} />

          <label>Level</label>
          <select name="level" value={formData.level} onChange={handleChange}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {error && <p className="error">{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <button disabled={loading}>{loading ? "Adding..." : "Create Course"}</button>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;