import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useGetCurrentUserInfo } from "./useGetCurrentUserInfo";

export const useGetComments = (recipeID) => {
  const [comments, setComments] = useState([]);
  const { userID } = useGetCurrentUserInfo();
  const commentCollectionRef = collection(db, "comments");

  useEffect(() => {
    if (!userID) return; // Exit if userID is undefined or null
    let unsubscribe;
    try {
      const commentsQuery = query(
        commentCollectionRef,
        where("recipeID", "==", recipeID),
        orderBy("createdAt")
      );
      unsubscribe = onSnapshot(commentsQuery, (querySnapshot) => {
        const comments = [];
        querySnapshot.forEach((doc) => {
          comments.push({ commentID: doc.id, ...doc.data() });
        });
        setComments(comments);
      });
    } catch (error) {
      console.error("Error fetching comments: ", error);
    }
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [userID]);
  return { comments };
};
