import Header from "../../components/header";
import Navbar from "../../components/navbar";
import { useAddRecipe } from "../../hooks/useAddRecipe";
import { useGetCurrentUserInfo } from "../../hooks/useGetCurrentUserInfo";
import { Navigate } from "react-router-dom";
import RecipeInformation from "../../components/recipeInformation";
import Ingredients from "../../components/ingredients";
import Instructions from "../../components/instructions";
import { useState } from "react";
import "./styles.css";

export default function CreateRecipe() {
  const { isAuth } = useGetCurrentUserInfo();
  const [author, setAuthor] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [yieldAmount, setYieldAmount] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "" },
  ]);
  const [instructions, setInstructions] = useState([
    { step: "", instruction: "" },
  ]);
  const [recipeImageURL, setRecipeImageURL] = useState("");
  const { addRecipe } = useAddRecipe();

  const addInstruction = () => {
    setInstructions([...instructions, { step: "", instruction: "" }]);
  };

  const removeInstruction = (index) => {
    const updatedInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(updatedInstructions);
  };

  const handleInstructionChange = (index, event) => {
    const { name, value } = event.target;
    const updatedInstructions = instructions.map((instruction, i) =>
      i === index ? { ...instruction, [name]: value } : instruction
    );
    setInstructions(updatedInstructions);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  };

  // Function to handle removing an ingredient
  const removeIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  // Function to handle input changes
  const handleIngredientChange = (index, event) => {
    const { name, value } = event.target;
    const updatedIngredients = ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [name]: value } : ingredient
    );
    setIngredients(updatedIngredients);
  };

  const createRecipe = () => {
    addRecipe({
      author,
      recipeName,
      recipeDescription,
      totalTime,
      yieldAmount,
      cuisine,
      ingredients,
      instructions,
      recipeImageURL,
    });
    setAuthor("");
    setRecipeName("");
    setRecipeDescription("");
    setTotalTime("");
    setYieldAmount("");
    setCuisine("");
    setIngredients([{ name: "", quantity: "", unit: "" }]);
    setInstructions([{ step: "", instruction: "" }]);
    setRecipeImageURL("");
  };

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <Header />
      <Navbar />
      <div className="create-recipe-main-content">
        <div className="content-container">
          <div className="create-recipe-left-section">
            <RecipeInformation
              author={author}
              recipeName={recipeName}
              recipeDescription={recipeDescription}
              totalTime={totalTime}
              yieldAmount={yieldAmount}
              cuisine={cuisine}
              setAuthor={setAuthor}
              setRecipeName={setRecipeName}
              setRecipeDescription={setRecipeDescription}
              setTotalTime={setTotalTime}
              setYieldAmount={setYieldAmount}
              setCuisine={setCuisine}
            />
            <Ingredients
              ingredients={ingredients}
              handleIngredientChange={handleIngredientChange}
              removeIngredient={removeIngredient}
              addIngredient={addIngredient}
            />
          </div>
          <div className="create-recipe-right-section">
            <Instructions
              instructions={instructions}
              handleInstructionChange={handleInstructionChange}
              removeInstruction={removeInstruction}
              addInstruction={addInstruction}
            />
            <div className="recipe-image">
              <label className="label-category">Upload Image</label>
              <input
                type="text"
                placeholder="Image URL"
                value={recipeImageURL}
                onChange={(e) => setRecipeImageURL(e.target.value)}
              />
            </div>
            <button className="create-recipe-btn" onClick={createRecipe}>
              Create Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
