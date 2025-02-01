import { Routes, Route } from "react-router-dom";
import Navbar from "./components/publicApp/Navbar";
import Login from "./components/publicApp/Login";
import Register from "./components/publicApp/Register";
import Feed from "./components/publicApp/Feed";
import ProtectedRoute from "./components/publicApp/ProtectedRoute";
import PersonalProfile from "./components/privateProfile/PersonalProfile";
import EditProfile from "./components/privateProfile/EditProfile";
import CreatePost from "./components/privateProfile/CreatePost";
import Home from "./components/publicApp/Home";
import "./App.css";

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile/personal"
              element={
                <ProtectedRoute>
                  <PersonalProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feed"
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/personal/newpost"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
