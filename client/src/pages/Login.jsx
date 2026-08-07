import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    if (email === "") {
      setError("Please enter your email.");
      return;
    }

    if (password === "") {
      setError("Please enter your password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });

      // Save token and user info so the app remembers the logged-in user
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));

      navigate("/dashboard");
    } catch (err) {
      // Backend sends { message: "..." } on failure
      const message = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Login to your EduVerse Account</p>

        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
          />

          {error && <p className="error">{error}</p>}

          <button disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;