import "./instructions.css";

const Instructions = ({
  instructions,
  handleInstructionChange,
  removeInstruction,
  addInstruction,
}) => {
  return (
    <div className="instructions">
      <label className="label-category">Instructions</label>
      {instructions.map((instruction, index) => (
        <div key={index} className="instruction-row">
          <input
            type="number"
            name="step"
            value={instruction.step}
            onChange={(e) => handleInstructionChange(index, e)}
            placeholder="Step Number"
          />
          <textarea
            name="instruction"
            value={instruction.instruction}
            onChange={(e) => handleInstructionChange(index, e)}
            placeholder="Instructions"
          />
          <button
            className="remove-instruction-btn"
            type="button"
            onClick={() => removeInstruction(index)}
          >
            Remove Instruction
          </button>
        </div>
      ))}
      <button className="add-instruction-btn" onClick={addInstruction}>
        Add Instruction
      </button>
    </div>
  );
};

export default Instructions;
