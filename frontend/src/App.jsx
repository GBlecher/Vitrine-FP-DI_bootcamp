import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Feed from "./components/Feed";
import ProtectedRoute from "./components/ProtectedRoute";
import PersonalProfile from "./components/PersonalProfile";
import EditProfile from "./components/EditProfile"
import "./App.css";

function App() {
 

  return (
    <>
      <div className="app">
        <Navbar/>
        <main className="container">
          <Routes>
            <Route path='/' element={<h2>WELCOME TO VITRINE!</h2>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/profile/personal'
              element={
                <ProtectedRoute>
                  <PersonalProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/feed'
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />
            <Route
              path='/update'
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
          
          

        </main>

      </div>
    </>
  )
}

export default App
