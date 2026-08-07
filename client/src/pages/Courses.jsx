import { useState, useEffect } from "react";
import "./Courses.css";
import { Link } from "react-router-dom";
import api from "../services/api";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await api.get("/courses");
        setCourses(response.data);
      } catch (err) {
        setError("Could not load courses. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="courses-page">
        <h1>All Courses</h1>
        <p>Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="courses-page">
        <h1>All Courses</h1>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="courses-page">
      <h1>All Courses</h1>
      <p>Explore our collection of courses.</p>

      {courses.length === 0 ? (
        <p>No courses available yet.</p>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <div className="course-card" key={course._id}>
              <img
                src={
                  course.thumbnail ||
                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500"
                }
                alt={course.title}
              />

              <div className="course-content">
                <h2>{course.title}</h2>
                <p>Instructor: {course.instructor}</p>
                <h3>{course.price === 0 ? "Free" : `₹${course.price}`}</h3>

                <Link to={`/course/${course._id}`}>
                  <button>View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;