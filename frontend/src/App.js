// import logo from './logo.svg';
import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route, useNavigate } from "react-router-dom";

import Create from "./components/Students/Create";
import Read from "./components/Students/Read";
import Update from "./components/Students/Update";
import Register from "./components/Login-Register/Register";
import Login from "./components/Login-Register/Login";
import Home from "./components/Home";
import Profile from "./components/Login-Register/Profile";
import ProctedRoute from "./components/ProctedRoute";
import Errorpage from "./components/Errorpage";
import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const navigate = useNavigate();
  let login = localStorage.getItem("login_token");
  useEffect(() => {
    if (!login) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
      // navigate('/mes')
    }
  });

  return (
    <div className="App">
      <NavBar />
      <Routes>
        {/* Home */}
        <Route excat path="/" element={<Home />} />

        {/* For Students entry */}
        <Route path="/add" element={<Create />} />
        <Route excat path="/all" element={<Read />} />
        <Route
          path="/update/:id"
          element={<ProctedRoute Component={Update} />}
        />

        {/* For faculty */}
        <Route excat path="/register" element={<Register />} />
        {/* {!isLoggedIn ? (
          <Route
            excat
            path="/login"
            element={<ProctedRoute Component={Login} />}
          />
        ) : (
          <Route
            excat
            path="/me"
            element={Profile} 
          />
        )}   */}

        <Route
          excat
          path="/login"
          element={
            !isLoggedIn ? (
              <ProctedRoute Component={Login} />
            ) : (
              <ProctedRoute Component={Profile} />
            )
          }
        />

        <Route
          excat
          path="/me"
          element={<ProctedRoute Component={Profile} />}
        />

        <Route path="*" element={<Errorpage />} />
      </Routes>
    </div>
  );
}

export default App;
