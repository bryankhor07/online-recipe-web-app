import { db } from "../config/firebase";
import {
  deleteDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const useDeleteRecipe = () => {
  // Create a reference to the transactions collection
  const recipeCollectionRef = collection(db, "recipes");
  const favoriteCollectionRef = collection(db, "favorites");
  const commentCollectionRef = collection(db, "comments");

  const deleteRecipe = async (recipeID) => {
    try {
      const recipeDocRef = doc(recipeCollectionRef, recipeID);
      await deleteDoc(recipeDocRef);

      // Query favorites collection for entries with this recipeID
      const favoriteQuery = query(
        favoriteCollectionRef,
        where("recipeID", "==", recipeID)
      );
      const favoriteSnapshot = await getDocs(favoriteQuery);

      // Delete each matching favorite entry
      const deleteFavorites = favoriteSnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );
      await Promise.all(deleteFavorites);

      // Query comments collection for entries with this recipeID
      const commentQuery = query(
        commentCollectionRef,
        where("recipeID", "==", recipeID)
      );
      const commentSnapshot = await getDocs(commentQuery);

      // Delete each matching comment entry
      const deleteComments = commentSnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );

      await Promise.all(deleteComments);
    } catch (error) {
      console.error("Error deleting recipe: ", error);
    }
  };

  return { deleteRecipe };
};
