import "./Home.css";
function Home() {
  return (
    <main>

      <section className="hero">

        <h1>Learn Without Limits</h1>

        <p>
          Master new skills with industry experts and build your dream career.
        </p>

        <button>Explore Courses</button>

      </section>

      <section className="featured-courses">

        <h2>Featured Courses</h2>

        <div className="course-container">

          <div className="course-card">
            <h3>Web Development</h3>
            <p>Learn HTML, CSS, JavaScript and React.</p>
            <button>View Course</button>
          </div>

          <div className="course-card">
            <h3>Data Structures & Algorithms</h3>
            <p>Master problem solving with C++.</p>
            <button>View Course</button>
          </div>

          <div className="course-card">
            <h3>Machine Learning</h3>
            <p>Start your AI journey from scratch.</p>
            <button>View Course</button>
          </div>

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