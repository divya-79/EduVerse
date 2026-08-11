import "./Home.css";
import herologo from "../assets/hero.svg";
import CourseCard from "../components/CourseCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await api.get("/courses");
        setCourses(response.data);
      } catch (err) {
        console.error("Could not load courses");
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <section className="hero">
        <div className="hero-left">
          <span className="hero-badge">🎓 Trusted by 10,000+ learners</span>

          <h1>
            Learn Without <span className="highlight">Limits</span>
          </h1>

          <p>Master new skills with industry experts and build your dream career.</p>

          <div className="hero-actions">
            <Link to="/courses">
              <button className="btn-primary">Explore Courses</button>
            </Link>
            <Link to="/about">
              <button className="btn-secondary">Learn More</button>
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <h3>{courses.length}+</h3>
              <p>Courses</p>
            </div>
            <div className="stat">
              <h3>10K+</h3>
              <p>Students</p>
            </div>
            <div className="stat">
              <h3>4.8★</h3>
              <p>Avg Rating</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img src={herologo} alt="hero-logo" className="hero-logo" />
        </div>
      </section>

      <section className="featured-courses">
        <span className="section-label">Featured</span>
        <h2>Explore Our Courses</h2>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search Courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="course-container">
          {loading ? (
            <p>Loading courses...</p>
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard
                key={course._id}
                id={course._id}
                title={course.title}
                description={course.description}
                instructor={course.instructor}
                type={course.price === 0 ? "free" : "paid"}
                price={course.price}
              />
            ))
          ) : (
            <h2 className="no-results">No Courses Found</h2>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <h3>EduVerse</h3>
          <p>Empowering learners worldwide.</p>
          <p className="footer-copy">&copy; 2026 EduVerse. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}

export default Home;