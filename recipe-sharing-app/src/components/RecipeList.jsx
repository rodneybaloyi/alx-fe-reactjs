import React, { useEffect } from 'react';
import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const initializeFilteredRecipes = useRecipeStore((state) => state.initializeFilteredRecipes);

  // Initialize filtered recipes when component mounts or recipes change
  useEffect(() => {
    if (recipes.length > 0 && filteredRecipes.length === 0 && !searchTerm) {
      initializeFilteredRecipes();
    }
  }, [recipes, filteredRecipes.length, searchTerm, initializeFilteredRecipes]);

  // Determine which recipes to display
  const recipesToDisplay = searchTerm ? filteredRecipes : recipes;

  const getDisplayMessage = () => {
    if (recipes.length === 0) {
      return "No recipes yet.";
    }
    if (searchTerm && filteredRecipes.length === 0) {
      return `No recipes found matching "${searchTerm}".`;
    }
    if (searchTerm && filteredRecipes.length > 0) {
      return `Found ${filteredRecipes.length} recipe${filteredRecipes.length === 1 ? '' : 's'} matching "${searchTerm}".`;
    }
    return null;
  };

  const displayMessage = getDisplayMessage();

  return (
    <div>
      {searchTerm && (
        <div style={{ 
          marginBottom: '15px', 
          padding: '10px', 
          backgroundColor: '#f0f8ff', 
          borderRadius: '4px',
          fontSize: '14px',
          color: '#333'
        }}>
          {displayMessage}
        </div>
      )}
      
      {recipesToDisplay.length === 0 && !searchTerm ? (
        <p style={{ 
          textAlign: 'center', 
          color: '#666', 
          fontSize: '16px',
          marginTop: '20px'
        }}>
          No recipes yet. Add your first recipe!
        </p>
      ) : recipesToDisplay.length === 0 && searchTerm ? (
        <p style={{ 
          textAlign: 'center', 
          color: '#666', 
          fontSize: '16px',
          marginTop: '20px'
        }}>
          No recipes found. Try a different search term.
        </p>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {recipesToDisplay.map((recipe) => (
            <div 
              key={recipe.id} 
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <h3 style={{ margin: '0 0 8px 0' }}>
                <Link 
                  to={`/recipe/${recipe.id}`}
                  style={{
                    textDecoration: 'none',
                    color: '#2196F3',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                  }}
                >
                  {recipe.title}
                </Link>
              </h3>
              {recipe.description && (
                <p style={{ 
                  margin: '0', 
                  color: '#666', 
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  {recipe.description.length > 150 
                    ? `${recipe.description.substring(0, 150)}...` 
                    : recipe.description
                  }
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;