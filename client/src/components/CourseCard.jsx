function CourseCard(props){
    return(
        <div className="course-card">
            <div className="course-image">Course Image</div>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <button>View Course</button>
          </div>
    )
};
export default CourseCard