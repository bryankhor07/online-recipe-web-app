import { updateDoc, collection, doc } from "firebase/firestore";
import { db } from "../config/firebase";

export const useUpdateUserProfile = () => {
  const userCollectionRef = collection(db, "users"); // Reference to the users collection

  const updateUserProfile = async (userID, updatedProfile) => {
    try {
      const userDocRef = doc(userCollectionRef, userID);
      await updateDoc(userDocRef, {
        bio: updatedProfile.bio,
        cookingExperience: updatedProfile.cookingExperience,
        favoriteCuisine: updatedProfile.favoriteCuisine,
      });
    } catch (error) {
      console.error("Error updating user profile: ", error);
    }
  };
  return { updateUserProfile };
};
