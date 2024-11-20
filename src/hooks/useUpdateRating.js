import { updateDoc, collection, doc } from "firebase/firestore";
import { db } from "../config/firebase";

export const useUpdateRating = () => {
  const recipeCollectionRef = collection(db, "recipes"); // Reference to the recipes collection

  const updateRating = async (
    recipeID,
    rating,
    totalRatings,
    numberOfRatings
  ) => {
    try {
      const recipeDocRef = doc(recipeCollectionRef, recipeID);
      await updateDoc(recipeDocRef, {
        totalRatings: totalRatings + rating,
        numberOfRatings: numberOfRatings + 1,
      });
    } catch (error) {
      console.error("Error updating rating: ", error);
    }
  };
  return { updateRating };
};
