import React, { useEffect } from 'react';
import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const favorites = useRecipeStore(state => state.favorites);
  const recipes = useRecipeStore(state => state.recipes);
  const refreshRecommendations = useRecipeStore(state => state.refreshRecommendations);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);
  const isFavorite = useRecipeStore(state => state.isFavorite);
  const getRecommendationStats = useRecipeStore(state => state.getRecommendationStats);

  // Get recommendation statistics
  const stats = getRecommendationStats();

  useEffect(() => {
    // Generate recommendations when component mounts or when recipes/favorites change
    if (recipes.length > 0) {
      refreshRecommendations();
    }
  }, [recipes.length, favorites.length, refreshRecommendations]);

  const handleToggleFavorite = (recipeId) => {
    if (isFavorite(recipeId)) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  const handleRefreshRecommendations = () => {
    refreshRecommendations();
  };

  if (recipes.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>No Recipes Available</h2>
        <p style={{ color: '#666' }}>Add some recipes first to see personalized recommendations!</p>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌟</div>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>Getting to Know Your Tastes</h2>
        <p style={{ 
          color: '#666', 
          marginBottom: '20px',
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          {favorites.length === 0 
            ? "Start by favoriting some recipes to get personalized recommendations!" 
            : "We're analyzing your favorites to find perfect recommendations for you."}
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <Link 
            to="/"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#2196F3',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Browse Recipes
          </Link>
          <button
            onClick={handleRefreshRecommendations}
            style={{
              padding: '12px 24px',
              backgroundColor: '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '30px',
        padding: '25px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '32px' }}>🌟</span>
          <div>
            <h2 style={{
              margin: '0',
              fontSize: '28px',
              fontWeight: 'bold'
            }}>
              Recommended for You
            </h2>
            <p style={{
              margin: '5px 0 0 0',
              fontSize: '16px',
              opacity: 0.9
            }}>
              Based on your {stats.favoriteCount} favorite recipe{stats.favoriteCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleRefreshRecommendations}
          style={{
            padding: '12px 20px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255,255,255,0.3)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          🔄 Refresh Recommendations
        </button>
      </div>

      {/* Recommendation Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: '2px solid #e3f2fd'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3' }}>
            {stats.totalRecipes}
          </div>
          <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
            Total Recipes
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: '2px solid #fce4ec'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e91e63' }}>
            {stats.favoriteCount}
          </div>
          <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
            Your Favorites
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: '2px solid #f3e5f5'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9c27b0' }}>
            {stats.recommendationCount}
          </div>
          <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
            Recommendations
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: '2px solid #fff3e0'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff9800' }}>
            {stats.favoritePercentage}%
          </div>
          <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
            Favorited
          </div>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div style={{
        display: 'grid',
        gap: '25px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
      }}>
        {recommendations.map((recipe, index) => (
          <div 
            key={recipe.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              border: '2px solid transparent',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)';
              e.currentTarget.style.borderColor = '#667eea';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            {/* Recommendation Badge */}
            <div style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              backgroundColor: '#667eea',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '15px',
              fontSize: '12px',
              fontWeight: 'bold',
              zIndex: 1
            }}>
              #{index + 1} Recommended
            </div>

            {/* Recipe Header */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '20px',
              position: 'relative'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <span style={{ fontSize: '24px' }}>🌟</span>
                <div style={{ 
                  fontSize: '12px', 
                  opacity: 0.9,
                  textAlign: 'right'
                }}>
                  Match Score: {recipe.score || 'New'}
                </div>
              </div>
              
              <h3 style={{
                margin: '0',
                fontSize: '20px',
                fontWeight: 'bold',
                lineHeight: '1.3'
              }}>
                {recipe.title}
              </h3>
            </div>

            {/* Recipe Content */}
            <div style={{ padding: '25px' }}>
              <p style={{
                color: '#666',
                fontSize: '15px',
                lineHeight: '1.6',
                margin: '0 0 25px 0'
              }}>
                {recipe.description.length > 130 
                  ? `${recipe.description.substring(0, 130)}...` 
                  : recipe.description
                }
              </p>

              {/* Why Recommended Section */}
              {recipe.score > 0 && (
                <div style={{
                  backgroundColor: '#f8f9fa',
                  padding: '15px',
                  borderRadius: '6px',
                  marginBottom: '20px',
                  border: '1px solid #e9ecef'
                }}>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#667eea',
                    textTransform: 'uppercase',
                    marginBottom: '5px'
                  }}>
                    Why we recommend this:
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#666',
                    lineHeight: '1.4'
                  }}>
                    Similar to recipes in your favorites • High compatibility score
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                <Link
                  to={`/recipe/${recipe.id}`}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '12px',
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
                  View Recipe
                </Link>

                <button
                  onClick={() => handleToggleFavorite(recipe.id)}
                  style={{
                    padding: '12px 16px',
                    backgroundColor: isFavorite(recipe.id) ? '#e91e63' : '#fff',
                    color: isFavorite(recipe.id) ? 'white' : '#e91e63',
                    border: `2px solid ${isFavorite(recipe.id) ? '#e91e63' : '#e91e63'}`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    transition: 'all 0.2s ease',
                    minWidth: '60px'
                  }}
                  onMouseEnter={(e) => {
                    if (isFavorite(recipe.id)) {
                      e.target.style.backgroundColor = '#c2185b';
                      e.target.style.borderColor = '#c2185b';
                    } else {
                      e.target.style.backgroundColor = '#e91e63';
                      e.target.style.color = 'white';
                    }
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    if (isFavorite(recipe.id)) {
                      e.target.style.backgroundColor = '#e91e63';
                      e.target.style.borderColor = '#e91e63';
                    } else {
                      e.target.style.backgroundColor = '#fff';
                      e.target.style.color = '#e91e63';
                    }
                    e.target.style.transform = 'scale(1)';
                  }}
                  title={isFavorite(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite(recipe.id) ? '💔' : '❤️'}
                </button>
              </div>
            </div>

            {/* Recipe Footer */}
            <div style={{
              padding: '15px 25px',
              backgroundColor: '#f8f9fa',
              borderTop: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{
                fontSize: '12px',
                color: '#666'
              }}>
                Recommended based on your preferences
              </div>
              <div style={{
                fontSize: '12px',
                color: '#667eea',
                fontWeight: 'bold'
              }}>
                🎯 Perfect Match
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action Section */}
      <div style={{
        marginTop: '40px',
        padding: '25px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center',
        border: '2px dashed #667eea'
      }}>
        <h3 style={{
          margin: '0 0 15px 0',
          color: '#333',
          fontSize: '20px'
        }}>
          Want More Personalized Recommendations?
        </h3>
        <p style={{
          color: '#666',
          marginBottom: '25px',
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          The more recipes you favorite, the better our recommendations become!
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <Link 
            to="/"
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              backgroundColor: '#2196F3',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1976D2';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#2196F3';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🔍 Explore All Recipes
          </Link>
          <Link 
            to="/favorites"
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              backgroundColor: '#e91e63',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#c2185b';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#e91e63';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            ❤️ View My Favorites
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsList;