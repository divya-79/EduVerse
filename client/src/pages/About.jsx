import "./About.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <h1>About EduVerse</h1>
        <p>
          EduVerse is an online learning platform designed to make quality
          education accessible to everyone. Learn, grow, and achieve your goals
          with industry-focused courses.
        </p>
      </section>

      {/* Mission */}
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to empower students by providing high-quality,
          affordable, and practical learning experiences that prepare them for
          real-world careers.
        </p>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Why Choose EduVerse?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>📚 Quality Courses</h3>
            <p>Learn from carefully designed, industry-relevant content.</p>
          </div>

          <div className="feature-card">
            <h3>👨‍🏫 Expert Instructors</h3>
            <p>Gain knowledge from experienced professionals.</p>
          </div>

          <div className="feature-card">
            <h3>💻 Learn Anytime</h3>
            <p>Access courses anytime, anywhere, at your own pace.</p>
          </div>

          <div className="feature-card">
            <h3>🎯 Career Focused</h3>
            <p>Build practical skills to prepare for internships and jobs.</p>
          </div>

        </div>
      </section>

      {/* Vision */}
      <section className="about-section">
        <h2>Our Vision</h2>
        <p>
          We envision a world where anyone can learn new skills, improve their
          career opportunities, and achieve success through accessible digital
          education.
        </p>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Start Your Learning Journey Today</h2>
        <Link to="/courses">
          <button>Explore Courses</button>
        </Link>
      </section>

    </div>
  );
}

export default About;