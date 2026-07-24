import "./CourseDetails.css";
import { useParams } from "react-router-dom";
import courses from "../data/courses";

function CourseDetails() {
    const { id } = useParams();
    const course = courses.find((course) => course.id === Number(id));
    return (
  <div className="course-details">

    <div className="course-details-image">
      Course Image
    </div>

    <h1>{course.title}</h1>

    <p>
      <strong>Instructor:</strong> {course.instructor}
    </p>

    <p>
      <strong>Category:</strong> {course.category}
    </p>

    <p className={course.type}>
      {course.type === "free" ? "FREE" : "PAID"}
    </p>

    {course.type === "paid" && (
      <p>
        <strong>Price:</strong> ₹{course.price}
      </p>
    )}

    <p>{course.description}</p>

    {course.type === "free" ? (
      <a
        href={course.youtubeLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>Watch on YouTube</button>
      </a>
    ) : (
      <button>Enroll Now</button>
    )}

  </div>
);
}

export default CourseDetails;