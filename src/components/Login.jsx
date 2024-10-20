import React, { useState } from "react";
import "./Login.css"; // Rename SignIn.css to Login.css

function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    console.log("Email to be sent:", email);

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        console.log("Login successful:", data.message);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to connect to the server");
      console.error("Error:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo"></div>
        <h1>Log in to Your Social Profile</h1>
        <p>Welcome back! Please log in to continue</p>
        <div className="oauth-buttons">
          <button className="google-button">
            <span className="google-icon"></span>
            Google
          </button>
          <button className="github-button">
            <span className="github-icon"></span>
            GitHub
          </button>
        </div>
        <div className="divider">or</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="continue-button">
            Continue
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Login successful!</p>}
        <p className="sign-up-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
        <div className="secured-by">
          Secured by <span className="secure-logo"></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
