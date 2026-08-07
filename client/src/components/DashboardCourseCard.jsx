import "./DashboardCourseCard.css";
import { Link } from "react-router-dom";

function DashboardCourseCard({ enrollment }) {
  const course = enrollment.course;

  return (
    <div className="dashboard-course-card">
      <img
        src={
          course.thumbnail ||
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500"
        }
        alt={course.title}
      />

      <div className="course-info">
        <h3>{course.title}</h3>
        <p>{course.instructor}</p>

        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${enrollment.progress}%` }}
          ></div>
        </div>

        <Link to={`/course/${course._id}`}>
          <button>Resume Course</button>
        </Link>
      </div>
    </div>
  );
}

export default DashboardCourseCard;