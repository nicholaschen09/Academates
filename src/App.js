import "./App.scss";
import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/home/home";
import Auth from "./components/auth/auth";
import { auth } from "./components/firebase/firebase.js";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import Grouproom from "./components/groupRoom/groupRoom";
import logo from "./components/images/logo.png";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [group, setGroup] = useState(null);
  const navigate = useNavigate();

  const cookies = new Cookies();

  const signUserOut = async () => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      setIsAuth(false);
      setGroup(null);
      localStorage.removeItem("room");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <nav>
        <img src={logo} />
        <button onClick={signUserOut}>Sign Out</button>
      </nav>

      <Routes>
        <Route exact path="/" element={<Auth />} />
        <Route exact path="/home/" element={<Home />} />
        <Route exact path="/home/:grade/:subject" element={<Grouproom />} />
      </Routes>
    </div>
  );
}

export default App;
