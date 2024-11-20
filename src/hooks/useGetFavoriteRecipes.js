import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetFavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const { userID } = useGetUserInfo();
  const favoriteCollectionRef = collection(db, "favorites");

  useEffect(() => {
    if (!userID) return; // Exit if userID is undefined or null
    let unsubscribe;
    try {
      const favoriteRecipesQuery = query(
        favoriteCollectionRef,
        where("favoritedUserID", "==", userID),
        orderBy("createdAt")
      );
      unsubscribe = onSnapshot(favoriteRecipesQuery, (querySnapshot) => {
        const favoriteRecipes = [];
        querySnapshot.forEach((doc) => {
          favoriteRecipes.push({ favoriteID: doc.id, ...doc.data() });
        });
        setFavoriteRecipes(favoriteRecipes);
      });
    } catch (error) {
      console.error("Error fetching favorite recipes: ", error);
    }
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [userID]); // Dependency array now includes userID
  return { favoriteRecipes, setFavoriteRecipes };
};
