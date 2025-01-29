import axios from "axios";
import { useState } from "react";
import { useAuth } from "../auth/useAuth.jsx";

import { useNavigate } from "react-router-dom";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const EditProfile = () => {
  
  const { user } = useAuth();
  const [profilepic, setProfilepic] = useState(user.profilepic );
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError("");
    console.log("handle submit:", user.userid);
    
    try {
      const response = await axios.put(
        `${apiBaseUrl}/api/user/${user.userid}`,
        { email, password, username, bio, profilepic },
        { withCredentials: true }
      );
      console.log("updated user:",response.data);
      
      // const { user, token, message } = response.data;
      // console.log({ user, token, message });
      // setError(message);
      navigate("/profile/personal");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
      console.log("Update ERR:",err);
      
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Profile Info</h2>
      <p>*All fields are optional</p>
      <form className="auth-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="profilepic">Profile Picture URL</label>
          {profilepic && (
            <div>
              <h4>Image Preview:</h4>
              <img
                src={profilepic}
                alt="Profile Preview"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          <input
            id="profilepic"
            name="profilepic"
            type="url"
            value={profilepic}
            onChange={(e) => setProfilepic(e.target.value)}
            placeholder="Enter the image URL here"
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter new username here"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter New email here"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password here"
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter new bio here"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Account"}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default EditProfile;
