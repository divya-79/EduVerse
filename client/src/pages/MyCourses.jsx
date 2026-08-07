import { useState, useEffect } from "react";
import "./MyCourses.css";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMyCourses() {
      try {
        const response = await api.get("/enrollments/my-courses");
        setEnrollments(response.data);
      } catch (err) {
        setError("Could not load your courses. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="my-courses">
        <h1>My Courses</h1>
        <p>Loading your courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-courses">
        <h1>My Courses</h1>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="my-courses">
      <h1>My Courses</h1>
      <p>Your enrolled courses.</p>

      {enrollments.length === 0 ? (
        <p>You haven't enrolled in any courses yet.</p>
      ) : (
        <div className="my-courses-grid">
          {enrollments.map((enrollment) => {
            const course = enrollment.course;
            return (
              <div className="my-course-card" key={enrollment._id}>
                <img
                  src={
                    course.thumbnail ||
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500"
                  }
                  alt={course.title}
                />

                <div className="course-details">
                  <h2>{course.title}</h2>
                  <p>{course.instructor}</p>

                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${enrollment.progress}%` }}
                    ></div>
                  </div>

                  <span>{enrollment.progress}% Completed</span>

                  <br />
                  <br />

                  <Link to={`/course/${course._id}`}>
                    <button>Continue Learning</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyCourses;