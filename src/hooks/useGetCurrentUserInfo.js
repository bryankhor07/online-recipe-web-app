import { useEffect, useState } from "react";

export const useGetCurrentUserInfo = () => {
  const [authInfo, setAuthInfo] = useState(() => {
    try {
      const storedAuth = localStorage.getItem("auth");
      return storedAuth ? JSON.parse(storedAuth) : null;
    } catch (error) {
      console.error("Error parsing auth info from localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const updatedAuth = localStorage.getItem("auth");
        setAuthInfo(updatedAuth ? JSON.parse(updatedAuth) : null);
      } catch (error) {
        console.error("Error updating auth info from localStorage:", error);
      }
    };

    // Listen for storage changes (e.g., across tabs or during sign-in)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const name = authInfo?.name || null;
  const profilePhoto = authInfo?.profilePhoto || null;
  const userID = authInfo?.userID || null;
  const isAuth = authInfo?.isUserAuthenticated || false;

  return { name, profilePhoto, userID, isAuth };
};
