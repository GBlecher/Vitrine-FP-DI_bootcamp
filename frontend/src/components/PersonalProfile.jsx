import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth.jsx";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const PersonalProfile = () => {
  const { user } = useAuth();
  const [personalProfile, setPersonalProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonalProfile = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/api/user/${user.userid}`,
          { withCredentials: true }
        );
        setPersonalProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalProfile();
  }, [user.userid]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!personalProfile) {
    return <p>User profile not found.</p>;
  }

  return (
    <>
      <div id="account_info">
        <img src={personalProfile.profilePic} alt="Account profile picture" />
        <h1>{`${personalProfile.username}`}</h1>
        {personalProfile.bio && <p>{personalProfile.bio}</p>}
        <button onClick={() => navigate("/update")}>
          Update Account information
        </button>
      </div>

      <div id="post_container">
        {personalProfile.posts &&
          personalProfile.posts.map((post) => (
            <div key={post.user_id} className="post">
              <img
                src={post.post_url}
                alt={`Post by user ${post.user_id}`}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default PersonalProfile;
