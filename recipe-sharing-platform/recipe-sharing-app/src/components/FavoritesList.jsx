import React from 'react';
import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
  const favorites = useRecipeStore(state => state.favorites);
  const recipes = useRecipeStore(state => state.recipes);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);
  
  // Get favorite recipes with full recipe data
  const favoriteRecipes = favorites.map(id =>
    recipes.find(recipe => recipe.id === id)
  ).filter(Boolean); // Remove any undefined entries

  const handleRemoveFavorite = (recipeId, recipeName) => {
    if (window.confirm(`Remove "${recipeName}" from your favorites?`)) {
      removeFavorite(recipeId);
    }
  };

  if (favoriteRecipes.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '20px'
        }}>
          ❤️
        </div>
        <h2 style={{
          color: '#333',
          marginBottom: '15px',
          fontSize: '24px'
        }}>
          No Favorite Recipes Yet
        </h2>
        <p style={{
          color: '#666',
          marginBottom: '30px',
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          Start exploring recipes and click the heart icon to add them to your favorites!
        </p>
        <Link 
          to="/"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#e91e63',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#c2185b';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#e91e63';
          }}
        >
          Discover Recipes
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '32px' }}>❤️</span>
          <div>
            <h2 style={{
              margin: '0',
              color: '#333',
              fontSize: '28px'
            }}>
              My Favorite Recipes
            </h2>
            <p style={{
              margin: '5px 0 0 0',
              color: '#666',
              fontSize: '16px'
            }}>
              {favoriteRecipes.length} recipe{favoriteRecipes.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        </div>
        
        <div style={{
          padding: '10px 20px',
          backgroundColor: '#e91e63',
          color: 'white',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          {favoriteRecipes.length} Favorite{favoriteRecipes.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
      }}>
        {favoriteRecipes.map((recipe) => (
          <div 
            key={recipe.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              border: '2px solid #e91e63'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
          >
            {/* Recipe Header */}
            <div style={{
              backgroundColor: '#e91e63',
              color: 'white',
              padding: '15px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '20px' }}>❤️</span>
              <span style={{
                fontSize: '12px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Favorite
              </span>
            </div>

            {/* Recipe Content */}
            <div style={{ padding: '20px' }}>
              <h3 style={{
                margin: '0 0 12px 0',
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                <Link 
                  to={`/recipe/${recipe.id}`}
                  style={{
                    color: '#333',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#e91e63';
                    e.target.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#333';
                    e.target.style.textDecoration = 'none';
                  }}
                >
                  {recipe.title}
                </Link>
              </h3>

              <p style={{
                color: '#666',
                fontSize: '14px',
                lineHeight: '1.5',
                margin: '0 0 20px 0'
              }}>
                {recipe.description.length > 120 
                  ? `${recipe.description.substring(0, 120)}...` 
                  : recipe.description
                }
              </p>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Link
                  to={`/recipe/${recipe.id}`}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '10px',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#1976D2';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#2196F3';
                  }}
                >
                  View Recipe
                </Link>

                <button
                  onClick={() => handleRemoveFavorite(recipe.id, recipe.title)}
                  style={{
                    padding: '10px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#d32f2f';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f44336';
                  }}
                >
                  💔 Remove
                </button>
              </div>
            </div>

            {/* Recipe Meta */}
            {recipe.createdAt && (
              <div style={{
                padding: '10px 20px',
                backgroundColor: '#f8f9fa',
                borderTop: '1px solid #eee',
                fontSize: '12px',
                color: '#666',
                textAlign: 'center'
              }}>
                Added to favorites • {new Date(recipe.createdAt).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Favorites Stats */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <p style={{
          margin: '0',
          color: '#666',
          fontSize: '14px'
        }}>
          You've favorited {favoriteRecipes.length} out of {recipes.length} recipes
        </p>
        <div style={{
          marginTop: '10px',
          height: '8px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${recipes.length > 0 ? (favoriteRecipes.length / recipes.length) * 100 : 0}%`,
            backgroundColor: '#e91e63',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
    </div>
  );
};

export default FavoritesList;