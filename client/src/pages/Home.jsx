import "./Home.css";
import herologo from "../assets/hero.svg"
import CourseCard from "../components/CourseCard";
import courses from "../data/courses";
import { useState } from "react";

function Home() {
  const [search, setSearch] = useState("");
  const filteredCourses = courses.filter((course) =>
  course.title.toLowerCase().includes(search.toLowerCase())
);
  
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
        <div className="search-container">
        <input
          type="text"
          placeholder="Search Courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

        <div className="course-container">

        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              instructor={course.instructor}
              type={course.type}
              price={course.price}
              youtubeLink={course.youtubeLink}
            />
          ))
        ) : (
          <h2>No Courses Found</h2>
        )}

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