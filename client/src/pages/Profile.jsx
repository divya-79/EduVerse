import { useState, useEffect } from "react";
import "./Profile.css";
import api from "../services/api";
import { Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    course: "",
    semester: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [myCourses, setMyCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsedUser = JSON.parse(stored);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || "",
        university: parsedUser.university || "",
        course: parsedUser.course || "",
        semester: parsedUser.semester || "",
      });
    }

    async function fetchMyCreatedCourses() {
      try {
        const response = await api.get("/courses/my-created");
        setMyCourses(response.data);
      } catch (err) {
        console.error("Could not load created courses");
      } finally {
        setLoadingCourses(false);
      }
    }

    fetchMyCreatedCourses();
  }, []);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSave() {
    setSaving(true);
    setError("");

    try {
      const response = await api.put("/users/profile", formData);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify({ ...user, ...response.data }));
      setIsEditing(false);
    } catch (err) {
      setError("Could not update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (!user) {
    return (
      <div className="profile-page">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-image">👤</div>

        {isEditing ? (
          <div className="profile-info">
            <label>Name</label>
            <input name="name" value={formData.name} onChange={handleChange} />

            <label>University</label>
            <input name="university" value={formData.university} onChange={handleChange} />

            <label>Course</label>
            <input name="course" value={formData.course} onChange={handleChange} />

            <label>Semester</label>
            <input name="semester" value={formData.semester} onChange={handleChange} />

            {error && <p className="error">{error}</p>}

            <button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <>
            <h1>{user.name}</h1>
            <div className="profile-info">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>University:</strong> {user.university || "Not set"}
              </p>
              <p>
                <strong>Course:</strong> {user.course || "Not set"}
              </p>
              <p>
                <strong>Semester:</strong> {user.semester || "Not set"}
              </p>
            </div>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </>
        )}
      </div>

      <div className="profile-card">
        <h2>My Created Courses</h2>

        {loadingCourses ? (
          <p>Loading...</p>
        ) : myCourses.length === 0 ? (
          <p>You haven't created any courses yet. <Link to="/add-course">Create one now</Link>.</p>
        ) : (
          <div className="my-created-list">
            {myCourses.map((course) => (
              <Link to={`/course/${course._id}`} key={course._id} className="my-created-item">
                <h3>{course.title}</h3>
                <p>{course.category} • {course.price === 0 ? "Free" : `₹${course.price}`}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;