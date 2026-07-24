import{useState} from "react";
import { Link } from "react-router-dom";
import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  function handleLogin(event){
    event.preventDefault();

    if(email === ""){
        setError("Please enter your email.");
        return;
    }

    if(password === ""){
        setError("Please enter your password.");
        return;
    }

    setError("");

    console.log(email);
    console.log(password);
    alert("Login Successful!");
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
            onChange={(event)=>{
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
            onChange={(event)=>{
        setPassword(event.target.value);
        setError("");
    }}
          />
          {error && <p className="error">{error}</p>}
          <button>Login</button>


        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;