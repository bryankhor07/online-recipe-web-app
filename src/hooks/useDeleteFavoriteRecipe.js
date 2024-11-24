import { db } from "../config/firebase";
import {
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useGetCurrentUserInfo } from "./useGetCurrentUserInfo";

export const useDeleteFavoriteRecipe = () => {
  // Create a reference to the transactions collection
  const favoriteCollectionRef = collection(db, "favorites");
  // Current user's userID
  const { userID } = useGetCurrentUserInfo();

  const deleteFavoriteRecipe = async (recipeID) => {
    try {
      // Query favorites collection for entries with this recipeID and favoritedUserID
      const favoriteQuery = query(
        favoriteCollectionRef,
        where("recipeID", "==", recipeID),
        where("favoritedUserID", "==", userID)
      );
      const favoriteSnapshot = await getDocs(favoriteQuery);

      // Delete each document found
      const deletePromises = favoriteSnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error deleting favorite recipe: ", error);
    }
  };

  return { deleteFavoriteRecipe };
};
