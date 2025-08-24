import React from "react";
import useRecipeStore from "../recipeStore";

const SearchBar = () => {
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="flex items-center gap-2 max-w-md mb-6">
      <input
        type="text"
        placeholder="Search recipes by title or description..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
      />
      {searchTerm && (
        <button
          onClick={handleClearSearch}
          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;
