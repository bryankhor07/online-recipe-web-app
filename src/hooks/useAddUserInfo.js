import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const useAddUserInfo = () => {
  const userCollectionRef = collection(db, "users"); // Reference to the users collection

  const addUserInfo = async ({ userID, name, profilePhoto }) => {
    try {
      const querySnapshot = await getDocs(
        query(userCollectionRef, where("userID", "==", userID))
      );
      if (!querySnapshot.empty) {
        return;
      }

      // Create a reference to the document with the userID as its ID
      const userDocRef = doc(db, "users", userID);

      // Set the document with userID as the ID and the user info
      await setDoc(userDocRef, {
        userID, // Optional since it's already the document ID, but helpful for redundancy
        name,
        profilePhoto,
        bio: "",
        favoriteCuisine: "",
        cookingExperience: "",
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };
  return { addUserInfo };
};
