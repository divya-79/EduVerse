import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setMenuOpen(false);
  }, [location]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="left">
        <Link to="/">
          <img src={logo} alt="EduVerse Logo" className="logo" />
        </Link>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-overlay ${menuOpen ? "open" : ""}`}>
        <div className="center">
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link to="/add-course">Create Course</Link>
              </li>
            )}
          </ul>
        </div>

        <div className="right">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="login-link">
                Profile
              </Link>
              <button className="register-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-link">
                Login
              </Link>
              <Link to="/register">
                <button className="register-btn">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;