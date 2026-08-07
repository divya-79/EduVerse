import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
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
        <img src={logo} alt="EduVerse Logo" className="logo" />
      </div>

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
    </nav>
  );
}

export default Navbar;