import "./recipeInformation.css";

const RecipeInformation = ({
  author,
  recipeName,
  recipeDescription,
  totalTime,
  yieldAmount,
  cuisine,
  setAuthor,
  setRecipeName,
  setRecipeDescription,
  setTotalTime,
  setYieldAmount,
  setCuisine,
}) => {
  return (
    <div className="recipe-information">
      <label className="label-category">Recipe Information</label>
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Recipe Name"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Recipe Description"
        value={recipeDescription}
        onChange={(e) => setRecipeDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Total Time"
        value={totalTime}
        onChange={(e) => setTotalTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Yield"
        value={yieldAmount}
        onChange={(e) => setYieldAmount(e.target.value)}
      />
      <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
        <option value="" disabled>
          Cuisine
        </option>
        <option value="italian">Italian</option>
        <option value="mexican">Mexican</option>
        <option value="chinese">Chinese</option>
        <option value="korean">Korean</option>
        <option value="greek">Greek</option>
        <option value="indian">Indian</option>
        <option value="american">American</option>
        <option value="japanese">Japanese</option>
        <option value="french">French</option>
        <option value="thai">Thai</option>
        <option value="spanish">Spanish</option>
        <option value="german">German</option>
        <option value="vietnamese">Vietnamese</option>
        <option value="mediterranean">Mediterranean</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export default RecipeInformation;
