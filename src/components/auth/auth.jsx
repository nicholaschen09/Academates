import "./auth.scss";
import React, { useState, useEffect } from "react";
import { auth, provider } from "../firebase/firebase.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const cookies = new Cookies();
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.log("Error signing in with Google:", error);
      alert(
        "An error occurred while signing in with Google. Please try again later."
      );
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, [isAuth, navigate]);

  return (
    <div className="auth">
      <h1>WELCOME TO ACADEMATES!📚</h1>
      <p>
        Academates is an awesome online platform that brings students from
        different educational backgrounds together! It's all about creating a
        super supportive community where you can find study buddies who are just
        as passionate about learning as you are.
      </p>

      <button onClick={handleSignInWithGoogle}>
        <i className="fa fa-google fa-fw"></i>
        Sign-In with Google
      </button>
    </div>
  );
};

export default Auth;
