import "./recipeModal.css";
import { useAddToFavorites } from "../hooks/useAddToFavorites";
import { useAddComment } from "../hooks/useAddComment";
import { useGetCurrentUserInfo } from "../hooks/useGetCurrentUserInfo";
import { useGetComments } from "../hooks/useGetComments";
import { useDeleteComment } from "../hooks/useDeleteComment";
import { useDeleteRecipe } from "../hooks/useDeleteRecipe";
import { useUpdateRating } from "../hooks/useUpdateRating";
import StarRating from "./starRating";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecipeModal({
  recipe,
  onClose,
  isFavoritePage,
  removeFromFavorites,
}) {
  const convertTime = (seconds, nanoseconds) => {
    const creationDate = new Date(seconds * 1000 + nanoseconds / 1000000);
    const formattedDate = creationDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short", // 'short' gives the abbreviated month (e.g., "May")
      day: "numeric",
    });
    return formattedDate;
  };

  const { addToFavorites } = useAddToFavorites();
  const { addComment } = useAddComment();
  const { deleteComment } = useDeleteComment();
  const { deleteRecipe } = useDeleteRecipe();
  const { updateRating } = useUpdateRating();
  const [commentText, setCommentText] = useState("");
  const { name, profilePhoto, userID } = useGetCurrentUserInfo();
  const { comments } = useGetComments(recipe.recipeID);
  const navigate = useNavigate();

  const handleAddToFavorites = () => {
    addToFavorites({
      author: recipe.author,
      recipeName: recipe.recipeName,
      recipeDescription: recipe.recipeDescription,
      totalTime: recipe.totalTime,
      yieldAmount: recipe.yieldAmount,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      recipeImageURL: recipe.recipeImageURL,
      createdAt: recipe.createdAt,
      recipeID: recipe.recipeID,
      userID: recipe.userID,
      favoritedUserID: userID,
    }); // Add the recipe to the favorites collection
  };

  const handleAddComment = () => {
    addComment({
      recipeID: recipe.recipeID,
      commentText: commentText,
      userID: userID,
      author: name,
      profilePhoto: profilePhoto,
    }); // Add a comment to the comments collection
    setCommentText(""); // Clear the comment input after
  };

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(recipe.recipeID);
    onClose();
  };

  const favoriteButton = () => {
    if (userID !== recipe.userID && !isFavoritePage) {
      return (
        <button className="like-button" onClick={handleAddToFavorites}>
          Add to Favorites
        </button>
      );
    } else if (isFavoritePage) {
      return (
        <button className="dislike-button" onClick={handleRemoveFromFavorites}>
          Remove from Favorites
        </button>
      );
    } else {
      return null;
    }
  };

  const handleRating = (rating) => {
    // Save the rating to the backend
    updateRating(
      recipe.recipeID,
      rating,
      recipe.totalRatings,
      recipe.numberOfRatings
    );
    // Implement the logic to save the rating to your backend
  };

  const redirectToProfilePage = () => {
    onClose();
    navigate(`/profile/${recipe.userID}`);
  };

  return (
    <div className="recipe-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="top-section">
          <div className="left-section">
            <h1>{recipe.recipeName}</h1>
            <p
              className="author"
              onClick={redirectToProfilePage}
              title="Visit author's profile"
            >
              By {recipe.author}
            </p>
            <p className="createdAt">
              {convertTime(
                recipe.createdAt.seconds,
                recipe.createdAt.nanoseconds
              )}
            </p>
            {favoriteButton()}
            {userID === recipe.userID ? (
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents opening the modal
                  deleteRecipe(recipe.recipeID);
                  onClose();
                }}
              >
                Delete
              </button>
            ) : (
              <div className="delete-placeholder"></div>
            )}
            {userID !== recipe.userID && !isFavoritePage && (
              <StarRating onRating={handleRating} readOnly={false} />
            )}
          </div>
          <div className="right-section">
            <img src={recipe.recipeImageURL} alt={recipe.recipeName} />
          </div>
        </div>
        <div className="bottom-section">
          <h2>Description</h2>
          <hr />
          <p className="p-tag">{recipe.recipeDescription}</p>
          <h2>Recipe Information</h2>
          <hr />
          <p className="p-tag">Total Time: {recipe.totalTime}</p>
          <p className="p-tag">Yield: {recipe.yieldAmount}</p>
          <h2>Ingredients</h2>
          <hr />
          {recipe.ingredients.map((ingredient, index) => (
            <p key={index} className="p-tag">
              {ingredient.quantity} {ingredient.unit} {ingredient.name}
            </p>
          ))}
          <h2>Preparation</h2>
          <hr />
          {recipe.instructions.map((instruction, index) => (
            <div key={index}>
              <p className="instruction-step">Step {instruction.step}</p>
              <p className="instruction-text">{instruction.instruction}</p>
            </div>
          ))}
          <h2>
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </h2>
          <hr />
          <div className="comment-input">
            <textarea
              className="comment-textarea"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddComment();
                }
              }}
            ></textarea>
            <button className="comment-button" onClick={handleAddComment}>
              Post
            </button>
          </div>
          <div className="comment-section">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                <img
                  src={comment.profilePhoto}
                  alt={comment.author}
                  className="comment-photo"
                />
                <div className="comment-content">
                  <div className="comment-header">
                    <p className="comment-author">{comment.author}</p>
                    <p className="comment-time">
                      {comment.createdAt ? (
                        convertTime(
                          comment.createdAt.seconds,
                          comment.createdAt.nanoseconds
                        )
                      ) : (
                        <p>Loading...</p>
                      )}
                    </p>
                  </div>
                  <div className="comment-container">
                    <p className="comment-text">{comment.commentText}</p>
                    {comment.userID === userID && (
                      <i
                        className="fas fa-trash trash-icon"
                        onClick={() => deleteComment(comment.commentID)}
                      ></i>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
