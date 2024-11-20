import { addDoc, getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export const useAddToFavorites = () => {
  const favoriteCollectionRef = collection(db, "favorites"); // Reference to the transactions collection

  const addToFavorites = async ({
    author,
    recipeName,
    recipeDescription,
    totalTime,
    yieldAmount,
    totalRatings,
    numberOfRatings,
    ingredients,
    instructions,
    recipeImageURL,
    createdAt,
    recipeID,
    userID,
    favoritedUserID,
  }) => {
    try {
      const querySnapshot = await getDocs(
        query(
          favoriteCollectionRef,
          where("recipeID", "==", recipeID),
          where("userID", "==", userID)
        )
      );
      if (!querySnapshot.empty) {
        return;
      }
      await addDoc(favoriteCollectionRef, {
        author,
        recipeName,
        recipeDescription,
        totalTime,
        yieldAmount,
        ingredients,
        instructions,
        recipeImageURL,
        createdAt,
        recipeID,
        userID,
        favoritedUserID,
      });
    } catch (error) {
      console.error("Error adding recipe to favorites: ", error);
    }
  };
  return { addToFavorites };
};
