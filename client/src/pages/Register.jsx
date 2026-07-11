import { Link } from "react-router-dom";
import "./Login.css";

function Register() {
  return (
    <div className="login-container">

      <div className="login-card">

        <h2>Create Account</h2>

        <p>Join EduVerse and start learning today.</p>

        <form>
          <label htmlFor="name">Name</label>
          <input 
          id="name"
          type="text"
          placeholder="Enter your name" />

          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
          />
          <label htmlFor="password">Confirm Password</label>

          <input
            id="password"
            type="password"
            placeholder="Confirm Your Password"
          />

          <button>Register</button>

        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;