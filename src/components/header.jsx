import "./header.css";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useGetCurrentUserInfo } from "../hooks/useGetCurrentUserInfo";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Retrieve the dark mode state from local storage, defaulting to false
    return localStorage.getItem("darkMode") === "true";
  });
  const [notification, setNotification] = useState("");
  const { userID, name } = useGetCurrentUserInfo();
  const { userInfo } = useGetUserInfo(userID);
  const navigate = useNavigate();

  useEffect(() => {
    // Apply the initial dark mode state
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Check if notification was shown before in the current session
    const notificationShown = localStorage.getItem("notificationShown");

    if (!notificationShown && name) {
      showNotification(`Hey ${name}, let’s get cooking! 🍲`);
      localStorage.setItem("notificationShown", "true");
    }
  }, [name]);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("auth");
      localStorage.removeItem("notificationShown");
      localStorage.removeItem("darkMode");
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode); // Save the state to local storage
    document.body.classList.toggle("dark-mode", newMode);
  };

  const redirectToProfilePage = () => {
    navigate(`/profile/${userID}`);
  };

  return (
    <header>
      {notification && <div className="notification">{notification}</div>}
      <div className="slogan-container">
        <h1 className="slogan-title">Your Culinary Legacy Awaits</h1>
        <i className="fas fa-utensils slogan-icon"></i>
      </div>
      <div className="title-container">
        <h1 className="header-title">Recipe.io</h1>
      </div>
      <div className="header-actions">
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
            aria-label="Toggle dark mode"
          />
          <span className="slider">
            <i className="fas fa-sun sun-icon"></i>
            <i className="fas fa-moon moon-icon"></i>
          </span>
        </label>
        <div className="profile-container">
          {userInfo[0] ? (
            <img
              src={userInfo[0].profilePhoto}
              alt="Profile Pic"
              className="profile-photo"
              onClick={redirectToProfilePage}
            />
          ) : null}
          <button className="log-out-btn" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
}
