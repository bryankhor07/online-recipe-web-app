import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useGetCurrentUserInfo } from "../../hooks/useGetCurrentUserInfo";
import { useGetUserRecipes } from "../../hooks/useGetUserRecipes";
import { useUpdateUserProfile } from "../../hooks/useUpdateUserProfile";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileNavBar from "../../components/profileNavBar";
import ProfileInfo from "../../components/profileInfo";
import RecipeCard from "../../components/recipeCard";
import RecipeModal from "../../components/recipeModal";
import "./styles.css";

export default function Profile() {
  const { userID } = useParams(); // Extract userID from the URL
  const { userInfo } = useGetUserInfo(userID);
  const { recipes } = useGetUserRecipes(userID);
  const { updateUserProfile } = useUpdateUserProfile();
  const [editProfile, setEditProfile] = useState(false);
  const { isAuth } = useGetCurrentUserInfo();
  const navigate = useNavigate();

  // Default state with empty values
  const [profileInfoData, setProfileInfoData] = useState({
    userID: "",
    name: "",
    bio: "",
    profilePhoto: "",
    cookingExperience: "",
    favoriteCuisine: "",
  });
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Update profileInfoData when userInfo changes
  useEffect(() => {
    if (userInfo && userInfo[0]) {
      setProfileInfoData({
        userID: userInfo[0].userID || "",
        name: userInfo[0].name || "",
        bio: userInfo[0].bio || "",
        profilePhoto: userInfo[0].profilePhoto || "",
        cookingExperience: userInfo[0].cookingExperience || "",
        favoriteCuisine: userInfo[0].favoriteCuisine || "",
      });
    }
  }, [userInfo]);

  const goBack = () => {
    navigate("/recipes");
  };

  const saveChanges = () => {
    setEditProfile((prevState) => !prevState);
    updateUserProfile(userID, profileInfoData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileInfoData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe); // Set the clicked recipe as the selected recipe
  };

  const closeModal = () => {
    setSelectedRecipe(null); // Clear the selected recipe to close the modal
  };

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="profile-page">
      <ProfileNavBar
        saveChanges={saveChanges}
        editProfile={editProfile}
        profileInfoData={profileInfoData}
        goBack={goBack}
      />
      <ProfileInfo
        editProfile={editProfile}
        profileInfoData={profileInfoData}
        handleChange={handleInputChange}
      />
      <h2 className="user-recipes-title">{profileInfoData.name}'s Recipes</h2>
      <div className="recipe-container">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => handleRecipeClick(recipe)}
            />
          ))
        ) : (
          <div className="no-recipes">
            <p>{profileInfoData.name} doesn't have any recipes.</p>
          </div>
        )}
      </div>
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={closeModal} />
      )}
    </div>
  );
}
