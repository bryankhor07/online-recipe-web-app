import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/index";
import Recipes from "./pages/recipes/index";
import MyRecipes from "./pages/my-recipes/index";
import CreateRecipe from "./pages/create-recipe/index";
import Favorites from "./pages/favorites/index";
import Profile from "./pages/profile/index";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile/:userID" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
