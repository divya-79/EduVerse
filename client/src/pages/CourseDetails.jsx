import { useState, useEffect } from "react";
import "./CourseDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const [enrollMessage, setEnrollMessage] = useState("");

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await api.get(`/courses/${id}`);
        setCourse(response.data);
      } catch (err) {
        setError("Course not found.");
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id]);

  async function handleEnroll() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setEnrolling(true);
    setEnrollMessage("");

    try {
      await api.post(`/enrollments/${id}`);
      setEnrollMessage("Successfully enrolled! 🎉");
    } catch (err) {
      const message = err.response?.data?.message || "Could not enroll. Please try again.";
      setEnrollMessage(message);
    } finally {
      setEnrolling(false);
    }
  }

  if (loading) {
    return <div className="course-details"><p>Loading course...</p></div>;
  }

  if (error) {
    return <div className="course-details"><p className="error">{error}</p></div>;
  }

  const isFree = course.price === 0;

  return (
    <div className="course-details">
      <div className="course-details-image">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} />
        ) : (
          "Course Image"
        )}
      </div>

      <h1>{course.title}</h1>

      <p>
        <strong>Instructor:</strong> {course.instructor}
      </p>

      <p>
        <strong>Category:</strong> {course.category}
      </p>

      <p className={isFree ? "free" : "paid"}>{isFree ? "FREE" : "PAID"}</p>

      {!isFree && (
        <p>
          <strong>Price:</strong> ₹{course.price}
        </p>
      )}

      <p>{course.description}</p>

      <button onClick={handleEnroll} disabled={enrolling}>
        {enrolling ? "Enrolling..." : "Enroll Now"}
      </button>

      {enrollMessage && <p>{enrollMessage}</p>}
    </div>
  );
}

export default CourseDetails;