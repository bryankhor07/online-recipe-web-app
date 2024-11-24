import {
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useGetCurrentUserInfo } from "./useGetCurrentUserInfo";

export const useAddRecipe = () => {
  const recipeCollectionRef = collection(db, "recipes"); // Reference to the transactions collection
  const { userID } = useGetCurrentUserInfo();

  const addRecipe = async ({
    author,
    recipeName,
    recipeDescription,
    totalTime,
    yieldAmount,
    cuisine,
    ingredients,
    instructions,
    recipeImageURL,
  }) => {
    try {
      const newRecipe = await addDoc(recipeCollectionRef, {
        author,
        recipeName,
        recipeDescription,
        totalTime,
        yieldAmount,
        cuisine,
        totalRatings: 0,
        numberOfRatings: 0,
        ingredients,
        instructions,
        recipeImageURL,
        userID,
        createdAt: serverTimestamp(),
      });
      await updateDoc(newRecipe, { recipeID: newRecipe.id });
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  };
  return { addRecipe };
};
