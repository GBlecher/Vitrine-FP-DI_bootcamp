import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Send a POST request to register the user
      const registerResponse =await axios.post(
        `${apiBaseUrl}/api/user/register`,
        { email, password, username },
        { withCredentials: true }
      );
      console.log("Registration response:", registerResponse.data);
      // Send a POST request to log in the user
      
      const loginResponse  = await axios.post(
        `${apiBaseUrl}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log("Login response:", loginResponse.data);
      

      const { user, token, message } = loginResponse .data;
      console.log({ user, token, message });
      // Call the login function with the retrieved user and token
      login(user, token, message);
      setError(message);
      navigate("/update");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };
  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button type="submit">Create Account</button>
        {error && <div className="error-message">{error}</div>}
        <p>Already have an account? <Link to="/Login">Log in</Link></p>
      </form>
    </div>
  );
};
export default Register;
