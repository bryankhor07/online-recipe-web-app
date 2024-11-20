import { db } from "../config/firebase";
import { deleteDoc, doc, collection } from "firebase/firestore";

export const useDeleteComment = () => {
  const commentCollectionRef = collection(db, "comments");

  const deleteComment = async (commentID) => {
    try {
      const commentDocRef = doc(commentCollectionRef, commentID);
      await deleteDoc(commentDocRef);
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  return { deleteComment };
};
