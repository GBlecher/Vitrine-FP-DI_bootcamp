import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth.jsx";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const PrivProfileInfo = () => {
  const { user } = useAuth();
  const [privProfileInfo, setPrivProfileInfo] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    
    const fetchPrivProfileInfo = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/api/user/${user.userid}`,
          { withCredentials: true }
        );
        setPrivProfileInfo(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load user profile.");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchPrivProfileInfo();
  }, [user.userid]);

  if (loadingProfile) {
    return <p>Loading profile...</p>;
  }

  if (!privProfileInfo) {
    return <p>User profile not found.</p>;
  }

  if (error) return <div>{error}</div>;

  return (
    <>
      <div id="account_info">
        <img src={privProfileInfo.profilepic} alt="Account profile picture" />
        <h1>{`${privProfileInfo.username}`}</h1>
        {privProfileInfo.bio && <p>{privProfileInfo.bio}</p>}
        <button onClick={() => navigate("/update")}>
          Update Account information
        </button>
      </div>

      
    </>
  );
};

export default PrivProfileInfo;
