import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import GoogleIcon from "./google-icon.webp";
import "./styles.css";

export default function Auth() {
  const navigate = useNavigate();
  const { isUserAuthenticated } = useGetUserInfo();

  const signInWithGoogle = async () => {
    try {
      const results = await signInWithPopup(auth, provider);
      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isUserAuthenticated: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/recipes");
    } catch (error) {
      console.error(error);
    }
  };

  if (isUserAuthenticated) {
    return <Navigate to="/recipes" />;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome to Recipe.io!</h1>
        <p className="login-text">Sign in to continue</p>
        <button className="login-button" onClick={signInWithGoogle}>
          Sign In With Google{" "}
          <img src={GoogleIcon} alt="Google Icon" className="google-icon" />
        </button>
      </div>
    </div>
  );
}
