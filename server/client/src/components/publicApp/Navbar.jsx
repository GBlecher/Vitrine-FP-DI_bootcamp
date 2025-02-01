import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../auth/useAuth.jsx";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated, user } = useAuth();
  console.log("user in navbar:", user);
  // Handle logout process
  const handleLogout = async () => {
    try {
      // Send a POST request to log out the user
      await axios.post(
        `${apiBaseUrl}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      logout();
      navigate("/login");// Redirect to the login page after logout
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav>
      <div style={{ display: "flex", gap: "10px" }}>
        {/* when not logged in */}
        {!isAuthenticated && (
          <>
            <Link to={"/"}>Home</Link>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
        {/* while logged in */}
        {isAuthenticated && <Link to={"/feed"}>Feed</Link>}
        {isAuthenticated && <Link to={`/profile/personal`}>Profile</Link>}
        {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
};
export default Navbar;
