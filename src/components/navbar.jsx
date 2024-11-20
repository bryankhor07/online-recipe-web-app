import "./navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const [currentPage, setCurrentPage] = useState("");

  // Sync state with route changes
  useEffect(() => {
    if (location.pathname === "/recipes") {
      setCurrentPage("recipes-link");
    } else if (location.pathname === "/my-recipes") {
      setCurrentPage("my-recipes-link");
    } else if (location.pathname === "/favorites") {
      setCurrentPage("favorites-link");
    } else if (location.pathname === "/create-recipe") {
      setCurrentPage("create-recipe-link");
    }
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav>
      <ul>
        <li
          onClick={() => {
            handleNavigation("/recipes");
          }}
          className={
            currentPage === "recipes-link"
              ? "recipes-link-active"
              : "recipes-link"
          }
        >
          Recipes
        </li>
        <li
          onClick={() => {
            handleNavigation("/my-recipes");
          }}
          className={
            currentPage === "my-recipes-link"
              ? "my-recipes-link-active"
              : "my-recipes-link"
          }
        >
          My Recipes
        </li>
        <li
          onClick={() => handleNavigation("/create-recipe")}
          className={
            currentPage === "create-recipe-link"
              ? "create-recipe-link-active"
              : "create-recipe-link"
          }
        >
          Create Recipe
        </li>
        <li
          onClick={() => handleNavigation("/favorites")}
          className={
            currentPage === "favorites-link"
              ? "favorites-link-active"
              : "favorites-link"
          }
        >
          Favorites
        </li>
      </ul>
    </nav>
  );
}
