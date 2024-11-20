import "./cuisineFilter.css";

const CuisineFilter = ({
  selectedCuisine,
  onFilterChange,
  onApplyFilter,
  isFilterApplied,
}) => {
  return (
    <div className="cuisine-filter-container">
      <select
        className="cuisine-filter"
        value={selectedCuisine}
        onChange={onFilterChange}
      >
        <option value="">Cuisine</option>
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
      <button
        onClick={onApplyFilter}
        className="filter-button"
        disabled={!selectedCuisine && !isFilterApplied}
      >
        {isFilterApplied ? "Clear Filter" : "Apply Filter"}
      </button>
    </div>
  );
};

export default CuisineFilter;
