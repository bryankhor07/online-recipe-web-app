import Header from "../../components/header";
import Navbar from "../../components/navbar";
import { useState } from "react";
import { useGetFavoriteRecipes } from "../../hooks/useGetFavoriteRecipes";
import { useDeleteFavoriteRecipe } from "../../hooks/useDeleteFavoriteRecipe";
import { useGetCurrentUserInfo } from "../../hooks/useGetCurrentUserInfo";
import { Navigate } from "react-router-dom";
import RecipeCard from "../../components/recipeCard";
import RecipeModal from "../../components/recipeModal";
import Footer from "../../components/footer";
import "./styles.css";

export default function Favorites() {
  const { favoriteRecipes, setFavoriteRecipes } = useGetFavoriteRecipes(); // Update useGetUserRecipes to return setRecipes if needed
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { deleteFavoriteRecipe } = useDeleteFavoriteRecipe();
  const { isAuth } = useGetCurrentUserInfo();

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe); // Set the clicked recipe as the selected recipe
  };

  const closeModal = () => {
    setSelectedRecipe(null); // Clear the selected recipe to close the modal
  };

  const removeFromFavorites = async (recipeID) => {
    try {
      await deleteFavoriteRecipe(recipeID); // Call the function to delete from the database
      setFavoriteRecipes((prevFavorites) =>
        prevFavorites.filter((recipe) => recipe.recipeID !== recipeID)
      ); // Update the local state to remove the recipe
    } catch (error) {
      console.error("Failed to remove recipe from favorites: ", error);
    }
  };

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <Header />
      <Navbar />
      <div className="favorites-main-content">
        <div className="recipe-container">
          {favoriteRecipes?.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => handleRecipeClick(recipe)}
              isFavoritePage={true}
            />
          ))}
        </div>
      </div>
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={closeModal}
          isFavoritePage={true}
          removeFromFavorites={removeFromFavorites}
        />
      )}
      <Footer />
    </div>
  );
}
