import "./Home.css";
import herologo from "../assets/hero.svg"
import CourseCard from "../components/CourseCard";
function Home() {
  const courses = [
          {
            title: "Web Development",
            description: "Learn HTML, CSS, JavaScript and React."
          },
          {
            title: "DSA",
            description: "Master problem solving with C++."
          },
          {
            title: "Machine Learning",
            description: "Start your AI journey from scratch."
          }
        ];
  return (
    <main>

      <section className="hero">
        <div className="hero-left">

        <h1>Learn Without Limits</h1>

        <p>
          Master new skills with industry experts and build your dream career.
        </p>

        <button>Explore Courses</button>
          
        </div>
        <div className="hero-right">
          <img src={herologo} alt="hero-logo" className="hero-logo" />
        </div>

      </section>

      <section className="featured-courses">

        <h2>Featured Courses</h2>

        <div className="course-container">
          
        {courses.map((course, index) => (
        <CourseCard
          key={index}
          title={course.title}
          description={course.description}
        />
      ))}

        </div>

      </section>

      <footer className="footer">

  <h3>EduVerse</h3>

  <p>Empowering learners worldwide.</p>

  <p>&copy; 2026 EduVerse. All Rights Reserved.</p>

</footer>


    </main>
  );
}

export default Home;