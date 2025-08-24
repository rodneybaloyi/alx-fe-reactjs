import React, { useState } from "react";
import useRecipeStore from "../recipeStore";

const FavoriteButton = ({ recipeId, recipeName, size = "medium", showText = true }) => {
  const isFavorite = useRecipeStore((state) => state.isFavorite);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);
  const [isAnimating, setIsAnimating] = useState(false);

  const favorited = isFavorite(recipeId);

  const handleToggleFavorite = () => {
    setIsAnimating(true);

    if (favorited) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  // Tailwind size configs
  const sizeConfig = {
    small: "px-3 py-1 text-xs",
    medium: "px-4 py-2 text-sm",
    large: "px-5 py-3 text-base",
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`
        inline-flex items-center gap-2 rounded-full border-2 font-bold transition-all duration-300
        ${favorited ? "bg-pink-600 border-pink-600 text-white" : "bg-white border-pink-600 text-pink-600"}
        hover:scale-105 hover:shadow-lg
        ${sizeConfig[size] || sizeConfig.medium}
        ${isAnimating ? "scale-110 shadow-xl" : ""}
      `}
      title={
        favorited
          ? `Remove "${recipeName}" from favorites`
          : `Add "${recipeName}" to favorites`
      }
      aria-label={
        favorited
          ? `Remove ${recipeName} from favorites`
          : `Add ${recipeName} to favorites`
      }
    >
      <span
        className={`transition-transform duration-300 ${isAnimating ? "rotate-180 scale-125" : ""}`}
      >
        {favorited ? "💖" : "🤍"}
      </span>
      {showText && (
        <span
          className={`transition-opacity duration-300 ${isAnimating ? "opacity-70" : "opacity-100"}`}
        >
          {favorited ? "Favorited" : "Add to Favorites"}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;
