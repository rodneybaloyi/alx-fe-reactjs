import React from 'react';
import { useRecipeStore } from '../recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div style={{ 
      marginBottom: '20px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px',
      maxWidth: '400px'
    }}>
      <input
        type="text"
        placeholder="Search recipes by title or description..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          flex: 1,
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '16px'
        }}
      />
      {searchTerm && (
        <button
          onClick={handleClearSearch}
          style={{
            padding: '8px 12px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;