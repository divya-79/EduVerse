import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
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
      </ul>

      </div>


      <div className="right">
        <Link to="/login" className="login-link">
          Login
        </Link>

        <Link to="/register">
          <button className="register-btn">
            Register
          </button>
        </Link>
      </div>


    </nav>
  );
}

export default Navbar;


