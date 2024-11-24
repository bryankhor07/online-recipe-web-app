import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export const useGetUserRecipes = (userID) => {
  const [recipes, setRecipes] = useState([]);
  const recipeCollectionRef = collection(db, "recipes");

  useEffect(() => {
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
