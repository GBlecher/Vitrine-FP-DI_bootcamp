import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/useAuth.jsx";



const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated, user } = useAuth();
 console.log('user in navbar:',user);
 
  const handleLogout = async () => {
    try {
      await axios.post(
        `${apiBaseUrl}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to={"/"}>Home</Link>
        {!isAuthenticated && (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
        {isAuthenticated && <Link to={"/feed"}>Feed</Link>}
        {isAuthenticated && <Link to={`/profile/personal`}>Profile</Link>}
        {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
};
export default Navbar;
