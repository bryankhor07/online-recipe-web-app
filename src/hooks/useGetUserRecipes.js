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

export const useGetUserRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const { userID } = useGetUserInfo();
  const recipeCollectionRef = collection(db, "recipes");

  useEffect(() => {
    if (!userID) return; // Exit if userID is undefined or null
    let unsubscribe;
    try {
      const recipesQuery = query(
        recipeCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );
      unsubscribe = onSnapshot(recipesQuery, (querySnapshot) => {
        const recipes = [];
        querySnapshot.forEach((doc) => {
          recipes.push({ recipeID: doc.id, ...doc.data() });
        });
        setRecipes(recipes);
      });
    } catch (error) {
      console.error("Error fetching user recipes: ", error);
    }
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [userID]); // Dependency array now includes userID
  return { recipes };
};
