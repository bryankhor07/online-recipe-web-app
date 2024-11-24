import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetCurrentUserInfo } from "../../hooks/useGetCurrentUserInfo";
import { useAddUserInfo } from "../../hooks/useAddUserInfo";
import GoogleIcon from "./google-icon.webp";
import "./styles.css";

export default function Auth() {
  const navigate = useNavigate();
  const { isUserAuthenticated } = useGetCurrentUserInfo();
  const { addUserInfo } = useAddUserInfo();

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
      // Add user to the users collection if they don't already exist
      addUserInfo({
        userID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
      });
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
