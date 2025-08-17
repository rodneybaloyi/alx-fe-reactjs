import React, { useState } from 'react';
import { useRecipeStore } from '../recipeStore';

const FavoriteButton = ({ recipeId, recipeName, size = 'medium', showText = true }) => {
  const isFavorite = useRecipeStore(state => state.isFavorite);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);
  const [isAnimating, setIsAnimating] = useState(false);

  const favorited = isFavorite(recipeId);

  const handleToggleFavorite = () => {
    setIsAnimating(true);
    
    if (favorited) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }

    // Reset animation after it completes
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Size configurations
  const sizeConfig = {
    small: {
      padding: '6px 12px',
      fontSize: '12px',
      iconSize: '16px'
    },
    medium: {
      padding: '10px 16px',
      fontSize: '14px',
      iconSize: '18px'
    },
    large: {
      padding: '12px 20px',
      fontSize: '16px',
      iconSize: '20px'
    }
  };

  const config = sizeConfig[size] || sizeConfig.medium;

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: showText ? '8px' : '0',
    padding: config.padding,
    backgroundColor: favorited ? '#e91e63' : '#fff',
    color: favorited ? 'white' : '#e91e63',
    border: `2px solid ${favorited ? '#e91e63' : '#e91e63'}`,
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: config.fontSize,
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    outline: 'none',
    transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
    boxShadow: isAnimating 
      ? '0 4px 20px rgba(233, 30, 99, 0.4)' 
      : favorited 
        ? '0 2px 8px rgba(233, 30, 99, 0.2)' 
        : '0 2px 4px rgba(0,0,0,0.1)'
  };

  const iconStyle = {
    fontSize: config.iconSize,
    transition: 'all 0.3s ease',
    transform: isAnimating ? 'rotate(360deg) scale(1.3)' : 'rotate(0deg) scale(1)'
  };

  return (
    <button
      onClick={handleToggleFavorite}
      style={buttonStyle}
      onMouseEnter={(e) => {
        if (favorited) {
          e.target.style.backgroundColor = '#c2185b';
          e.target.style.borderColor = '#c2185b';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 15px rgba(233, 30, 99, 0.3)';
        } else {
          e.target.style.backgroundColor = '#e91e63';
          e.target.style.color = 'white';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 15px rgba(233, 30, 99, 0.3)';
        }
      }}
      onMouseLeave={(e) => {
        if (favorited) {
          e.target.style.backgroundColor = '#e91e63';
          e.target.style.borderColor = '#e91e63';
        } else {
          e.target.style.backgroundColor = '#fff';
          e.target.style.color = '#e91e63';
        }
        e.target.style.transform = isAnimating ? 'scale(1.1)' : 'scale(1)';
        e.target.style.boxShadow = favorited 
          ? '0 2px 8px rgba(233, 30, 99, 0.2)' 
          : '0 2px 4px rgba(0,0,0,0.1)';
      }}
      title={favorited 
        ? `Remove "${recipeName}" from favorites` 
        : `Add "${recipeName}" to favorites`
      }
      aria-label={favorited 
        ? `Remove ${recipeName} from favorites` 
        : `Add ${recipeName} to favorites`
      }
    >
      <span style={iconStyle}>
        {favorited ? '💖' : '🤍'}
      </span>
      {showText && (
        <span style={{ 
          transition: 'all 0.3s ease',
          opacity: isAnimating ? 0.7 : 1 
        }}>
          {favorited ? 'Favorited' : 'Add to Favorites'}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;