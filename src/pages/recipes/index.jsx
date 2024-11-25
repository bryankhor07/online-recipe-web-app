import Header from "../../components/header";
import Navbar from "../../components/navbar";
import { useState, useEffect } from "react";
import { useGetAllRecipes } from "../../hooks/useGetAllRecipes";
import { useGetCurrentUserInfo } from "../../hooks/useGetCurrentUserInfo";
import { Navigate } from "react-router-dom";
import RecipeCard from "../../components/recipeCard";
import RecipeModal from "../../components/recipeModal";
import SearchBar from "../../components/searchBar";
import CuisineFilter from "../../components/cuisineFilter";
import ChefQuotes from "../../components/chefQuotes";
import Footer from "../../components/footer";
import "./styles.css";

export default function Recipes() {
  const { recipes } = useGetAllRecipes(); // Update useGetUserRecipes to return setRecipes if needed
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [isSurprise, setIsSurprise] = useState(false);
  const [randomRecipe, setRandomRecipe] = useState([]);
  const { isAuth } = useGetCurrentUserInfo();

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe); // Set the clicked recipe as the selected recipe
  };

  const closeModal = () => {
    setSelectedRecipe(null); // Clear the selected recipe to close the modal
  };

  const handleFilterChange = (e) => {
    setSelectedCuisine(e.target.value);
  };

  const handleApplyFilter = () => {
    if (isFilterApplied) {
      // Clear the filter
      setSelectedCuisine("");
      setIsFilterApplied(false);
    } else {
      setSearchQuery(""); // Clear search input
      setActiveSearchQuery(""); // Clear active search query
      // Apply the filter
      setIsFilterApplied(true);
    }
  };

  useEffect(() => {
    if (activeSearchQuery) {
      // Filter recipes based on active search query
      const filtered = recipes.filter((recipe) =>
        recipe.recipeName
          .toLowerCase()
          .includes(activeSearchQuery.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } else if (isFilterApplied) {
      // Filter recipes based on selected cuisine
      const filtered = recipes.filter(
        (recipe) => recipe.cuisine.toLowerCase() === selectedCuisine
      );
      setFilteredRecipes(filtered);
    } else {
      // If no active search query, display all recipes
      setFilteredRecipes(recipes);
    }
  }, [activeSearchQuery, recipes, isFilterApplied, selectedCuisine]);

  const handleSearch = () => {
    setActiveSearchQuery(searchQuery);
  };

  const handleSurpriseClick = () => {
    if (isSurprise) {
      setIsSurprise(false); // Go back to showing all recipes
      setRandomRecipe(null);
    } else {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      setRandomRecipe(recipes[randomIndex]); // Pick a random recipe
      setIsSurprise(true);
    }
  };

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <Header />
      <Navbar />
      <div className="recipes-main-content">
        <CuisineFilter
          selectedCuisine={selectedCuisine}
          onFilterChange={handleFilterChange}
          onApplyFilter={handleApplyFilter}
          isFilterApplied={isFilterApplied}
        />
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />
        <button
          className="surprise-button"
          onClick={handleSurpriseClick}
          title={
            isSurprise
              ? "Click to show all recipes"
              : "Click for a surprise recipe!"
          }
        >
          {isSurprise ? "Show All Recipes" : "Surprise Me!"}
        </button>
        <div className="recipe-container">
          {isSurprise && randomRecipe ? (
            <RecipeCard
              key={randomRecipe.id}
              recipe={randomRecipe}
              onClick={() => handleRecipeClick(randomRecipe)}
            />
          ) : filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => handleRecipeClick(recipe)}
              />
            ))
          ) : (
            <div className="no-recipes">
              <p>No recipes found.</p>
            </div>
          )}
        </div>
      </div>
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={closeModal} />
      )}
      <ChefQuotes />
      <Footer />
    </div>
  );
}
