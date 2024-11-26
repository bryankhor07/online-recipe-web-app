import "./searchBar.css";

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search for 'pasta'"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
      />
      <i
        className="fas fa-search search-icon"
        onClick={onSearch}
        title="Search"
      ></i>
    </div>
  );
};

export default SearchBar;
