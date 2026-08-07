import { useState, useEffect } from "react";
import "./Dashboard.css";
import DashboardCourseCard from "../components/DashboardCourseCard";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await api.get("/users/dashboard");
        setData(response.data);
      } catch (err) {
        setError("Could not load dashboard. Please try logging in again.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-content">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard-content">
          <p className="error">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>EduVerse</h2>

        <ul>
          <li>
            <Link to="/dashboard">🏠 Dashboard</Link>
          </li>

          <li>
            <Link to="/my-courses">📚 My Courses</Link>
          </li>

          <li>
            <Link to="/profile">👤 Profile</Link>
          </li>

          <li>
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <h1>Welcome Back, {data.user.name} 👋</h1>

        <div className="stats">
          <div className="card">
            <h2>{data.totalCourses}</h2>
            <p>Total Courses</p>
          </div>

          <div className="card">
            <h2>{data.completedCourses}</h2>
            <p>Completed</p>
          </div>

          <div className="card">
            <h2>{data.inProgressCourses}</h2>
            <p>In Progress</p>
          </div>
        </div>

        <h2 className="heading">Continue Learning</h2>

        {data.enrollments.length === 0 ? (
          <p>You haven't enrolled in any courses yet.</p>
        ) : (
          <div className="course-grid">
            {data.enrollments.map((enrollment) => (
              <DashboardCourseCard key={enrollment._id} enrollment={enrollment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;