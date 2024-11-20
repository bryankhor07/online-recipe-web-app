import {
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const useAddComment = () => {
  const commentCollectionRef = collection(db, "comments"); // Reference to the comments collection

  const addComment = async ({
    recipeID,
    commentText,
    userID,
    author,
    profilePhoto,
  }) => {
    try {
      const newComment = await addDoc(commentCollectionRef, {
        recipeID,
        commentText,
        userID,
        author,
        profilePhoto,
        createdAt: serverTimestamp(),
      });
      await updateDoc(newComment, { commentID: newComment.id });
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  }; // Implement the function to add a comment

  return { addComment };
};
