import Header from "../../components/header";
import Navbar from "../../components/navbar";
import { useState, useEffect } from "react";
import { useGetUserRecipes } from "../../hooks/useGetUserRecipes";
import { useGetCurrentUserInfo } from "../../hooks/useGetCurrentUserInfo";
import RecipeCard from "../../components/recipeCard";
import RecipeModal from "../../components/recipeModal";
import SearchBar from "../../components/searchBar";
import CuisineFilter from "../../components/cuisineFilter";
import Footer from "../../components/footer";
import "./styles.css";

export default function MyRecipes() {
  const { userID } = useGetCurrentUserInfo();
  const { recipes } = useGetUserRecipes(userID); // Update useGetUserRecipes to return setRecipes if needed
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [activeSearchQuery, setActiveSearchQuery] = useState("");

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

  return (
    <div className="container">
      <Header />
      <Navbar />
      <div className="my-recipes-main-content">
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
        <div className="recipe-container">
          {filteredRecipes?.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => handleRecipeClick(recipe)}
            />
          ))}
        </div>
      </div>
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={closeModal} />
      )}
      <Footer />
    </div>
  );
}
