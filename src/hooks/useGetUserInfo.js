import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useGetCurrentUserInfo } from "./useGetCurrentUserInfo";

// Get the user info for a specific user from the database
export const useGetUserInfo = (userID) => {
  const [userInfo, setUserInfo] = useState({});
  const { isAuth } = useGetCurrentUserInfo();
  const userCollectionRef = collection(db, "users");

  useEffect(() => {
    let unsubscribe;
    try {
      const userQuery = query(userCollectionRef, where("userID", "==", userID));
      unsubscribe = onSnapshot(userQuery, (snapshot) => {
        const userInfo = [];
        snapshot.forEach((doc) => {
          userInfo.push({ id: doc.id, ...doc.data() });
        });
        setUserInfo(userInfo);
      });
    } catch (error) {
      console.error("Error fetching user info: ", error);
    }
    return () => unsubscribe();
  }, [isAuth, userID]);

  return { userInfo };
};
