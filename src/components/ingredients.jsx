import "./ingredients.css";

const Ingredients = ({
  ingredients,
  handleIngredientChange,
  removeIngredient,
  addIngredient,
}) => {
  return (
    <div className="ingredients">
      <label className="label-category">Ingredients</label>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="ingredient-row">
          <input
            type="text"
            name="name"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, e)}
            placeholder="Ingredient Name"
          />
          <input
            type="text"
            name="quantity"
            value={ingredient.quantity}
            onChange={(e) => handleIngredientChange(index, e)}
            placeholder="Quantity"
          />
          <input
            type="text"
            name="unit"
            value={ingredient.unit}
            onChange={(e) => handleIngredientChange(index, e)}
            placeholder="Unit (e.g., cups)"
          />
          <button
            className="remove-ingredient-btn"
            type="button"
            onClick={() => removeIngredient(index)}
          >
            Remove Ingredient
          </button>
        </div>
      ))}
      <button className="add-ingredient-btn" onClick={addIngredient}>
        Add Ingredient
      </button>
    </div>
  );
};

export default Ingredients;
