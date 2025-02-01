import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="auth-form-container">
        <h2 >WELCOME TO VITRINE!</h2>
        <br />
        <br />
        <div className="auth-form">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    </>
  );
};

export default Home;
