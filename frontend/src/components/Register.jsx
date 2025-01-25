import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username,setUsername]= useState("")
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
        await axios.post(
            `${apiBaseUrl}/api/user/register`,
            { email, password , username},
            { withCredentials: true }
      );

      const response = await axios.post(
        `${apiBaseUrl}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );
      // setError(message)
      const { user, token ,message} = response.data;
      console.log({ user, token,message });
      setError(message)
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };
  return (
    <div className='auth-form-container'>
      <h2>Register</h2>
      <form className='auth-form' onSubmit={handleSubmit}>
      <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            name='username'
            type='username'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Create Account</button>
        {error && <div className='error-message'>{error}</div>}
      </form>
    </div>
  );
};
export default Register;
