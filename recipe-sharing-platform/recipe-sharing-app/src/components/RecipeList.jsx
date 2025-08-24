import React, { useEffect } from 'react';
import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

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
          padding: '15px', 
          backgroundColor: '#f0f8ff', 
          borderRadius: '8px',
          fontSize: '14px',
          color: '#333',
          border: '1px solid #2196F3'
        }}>
          {displayMessage}
        </div>
      )}
      
      {recipesToDisplay.length === 0 && !searchTerm ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🍳</div>
          <h3 style={{ 
            color: '#333', 
            fontSize: '24px',
            marginBottom: '15px'
          }}>
            No recipes yet!
          </h3>
          <p style={{ 
            color: '#666', 
            fontSize: '16px',
            marginBottom: '30px',
            lineHeight: '1.5'
          }}>
            Start your culinary journey by adding your first recipe!
          </p>
          <Link 
            to="/add"
            style={{
              display: 'inline-block',
              padding: '15px 30px',
              backgroundColor: '#4CAF50',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#45a049';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#4CAF50';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            ➕ Add Your First Recipe
          </Link>
        </div>
      ) : recipesToDisplay.length === 0 && searchTerm ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
          <h3 style={{ 
            color: '#333', 
            fontSize: '24px',
            marginBottom: '15px'
          }}>
            No recipes found
          </h3>
          <p style={{ 
            color: '#666', 
            fontSize: '16px',
            marginBottom: '30px',
            lineHeight: '1.5'
          }}>
            Try a different search term or browse all recipes.
          </p>
          <button
            onClick={() => document.querySelector('input[type="text"]').focus()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            🔍 Try Another Search
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {recipesToDisplay.map((recipe) => (
            <div 
              key={recipe.id} 
              style={{
                border: '1px solid #ddd',
                borderRadius: '12px',
                padding: '0',
                backgroundColor: '#fff',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.15)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Recipe Header */}
              <div style={{
                padding: '20px 20px 15px 20px',
                borderBottom: '1px solid #f0f0f0'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '15px'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '22px' }}>
                      <Link 
                        to={`/recipe/${recipe.id}`}
                        style={{
                          textDecoration: 'none',
                          color: '#333',
                          fontWeight: 'bold',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = '#2196F3';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = '#333';
                        }}
                      >
                        {recipe.title}
                      </Link>
                    </h3>
                    
                    {recipe.createdAt && (
                      <p style={{
                        margin: '0',
                        color: '#999',
                        fontSize: '12px'
                      }}>
                        Created {new Date(recipe.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  
                  <FavoriteButton 
                    recipeId={recipe.id} 
                    recipeName={recipe.title}
                    size="small"
                    showText={false}
                  />
                </div>
              </div>

              {/* Recipe Content */}
              <div style={{ padding: '15px 20px 20px 20px' }}>
                {recipe.description && (
                  <p style={{ 
                    margin: '0 0 20px 0', 
                    color: '#666', 
                    fontSize: '15px',
                    lineHeight: '1.6'
                  }}>
                    {recipe.description.length > 200 
                      ? `${recipe.description.substring(0, 200)}...` 
                      : recipe.description
                    }
                  </p>
                )}

                {/* Recipe Actions */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center'
                }}>
                  <Link 
                    to={`/recipe/${recipe.id}`}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '12px 20px',
                      backgroundColor: '#2196F3',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#1976D2';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#2196F3';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    📖 View Full Recipe
                  </Link>

                  <FavoriteButton 
                    recipeId={recipe.id} 
                    recipeName={recipe.title}
                    size="medium"
                    showText={true}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recipe Stats Footer */}
      {recipesToDisplay.length > 0 && (
        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px',
            marginBottom: '15px'
          }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3' }}>
                {searchTerm ? filteredRecipes.length : recipes.length}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {searchTerm ? 'Matching Recipes' : 'Total Recipes'}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e91e63' }}>
                {useRecipeStore.getState().favorites.length}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Your Favorites
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9c27b0' }}>
                {useRecipeStore.getState().recommendations.length}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Recommendations
              </div>
            </div>
          </div>
          
          <p style={{
            margin: '0',
            color: '#666',
            fontSize: '13px',
            fontStyle: 'italic'
          }}>
            {searchTerm 
              ? `Showing filtered results for "${searchTerm}"` 
              : "Showing all available recipes"
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipeList;import React, { useEffect } from 'react';
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