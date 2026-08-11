import { Link } from "react-router-dom";

function getCourseIcon(title) {
  const lower = title.toLowerCase();
  if (lower.includes("web") || lower.includes("react") || lower.includes("development")) return "💻";
  if (lower.includes("data") || lower.includes("dsa") || lower.includes("algorithm")) return "📊";
  if (lower.includes("machine") || lower.includes("ai") || lower.includes("ml")) return "🤖";
  if (lower.includes("design") || lower.includes("ui") || lower.includes("ux")) return "🎨";
  return "📚";
}

// Generates a consistent-looking rating/students count based on course title
// so the same course always shows the same numbers (not random every render)
function getStats(title) {
  const seed = title.length;
  const rating = (4.3 + (seed % 6) * 0.1).toFixed(1);
  const students = 800 + seed * 137;
  return { rating, students };
}

function CourseCard(props) {
  const { rating, students } = getStats(props.title);
  const isBestseller = parseFloat(rating) >= 4.7;

  return (
    <Link to={`/course/${props.id}`} className="course-link">
      <div className="course-card">
        <div className="course-image">
          {isBestseller && <span className="bestseller-tag">Bestseller</span>}
          <span className="course-icon">{getCourseIcon(props.title)}</span>
        </div>

        <div className="course-card-body">
          <p className={props.type}>{props.type === "free" ? "FREE" : "PAID"}</p>

          <h3>{props.title}</h3>

          <p className="course-desc">{props.description}</p>

          <p className="instructor-line">
            <strong>Instructor:</strong> {props.instructor}
          </p>

          <div className="course-meta">
            <span className="rating">
              ⭐ {rating} <span className="students">({students.toLocaleString()} students)</span>
            </span>
          </div>

          {props.type === "paid" && (
            <p className="price-line">
              <strong>₹{props.price}</strong>
            </p>
          )}

          <button>View Details</button>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;