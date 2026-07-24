import { Link } from "react-router-dom";
function CourseCard(props) {
  return (
    <Link to={`/course/${props.id}`} className="course-link">
    <div className="course-card">

      <div className="course-image">
        Course Image
      </div>

      <h3>{props.title}</h3>

      <p>{props.description}</p>

      <p><strong>Instructor:</strong> {props.instructor}</p>

      <p className={props.type}>{props.type === "free" ? "FREE" : "PAID"}</p>

      {props.type === "paid" && (
        <p>
          <strong>Price:</strong> ₹{props.price}
        </p>
      )}

      <button>View Details</button>
    </div>
    </Link>
  );
}

export default CourseCard;