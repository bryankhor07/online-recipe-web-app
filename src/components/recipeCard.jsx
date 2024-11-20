import StarRating from "./starRating";
import "./recipeCard.css";

export default function RecipeCard({ recipe, onClick, isFavoritePage }) {
  const convertTime = (seconds, nanoseconds) => {
    const creationDate = new Date(seconds * 1000 + nanoseconds / 1000000);
    const formattedDate = creationDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short", // 'short' gives the abbreviated month (e.g., "May")
      day: "numeric",
    });
    return formattedDate;
  };

  const calculateAverageRating = () => {
    // Ensure no division by zero occurs
    console.log(recipe.recipeID);
    return recipe.numberOfRatings > 0
      ? Math.round(recipe.totalRatings / recipe.numberOfRatings)
      : 0;
  };

  return (
    <div className="recipe-card" onClick={onClick}>
      <img
        src={recipe.recipeImageURL}
        alt={recipe.recipeName}
        className="recipe-image"
      />
      <div className="recipe-info">
        <h1>{recipe.recipeName}</h1>
        <p className="author">By {recipe.author}</p>
        <p className="createdAt">
          {convertTime(recipe.createdAt.seconds, recipe.createdAt.nanoseconds)}
        </p>
        {!isFavoritePage && (
          <>
            <StarRating averageRating={calculateAverageRating()} readOnly />
            <p className="number-of-ratings">
              {recipe.numberOfRatings} Ratings
            </p>
          </>
        )}
      </div>
    </div>
  );
}
