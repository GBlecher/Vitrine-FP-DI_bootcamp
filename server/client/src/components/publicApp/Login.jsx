import { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";


const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Send a POST request to log in the user
      const response = await axios.post(
        `${apiBaseUrl}/api/user/login`,
        { identifier, password },
        { withCredentials: true }
      );
      const { user, token, message } = response.data;
      console.log({ user, token, message });
      login(user, token, message);
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="identifier">Email or Username</label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
          />
        </div>
        <button type="submit">Login</button>
        {error && <div className="error-message">{error}</div>}
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      
      </form>
    </div>
  );
};
export default Login;
