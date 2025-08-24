import React, { useEffect } from "react";
import useRecipeStore from "../recipeStore";
import FavoriteButton from "./FavoriteButton";

const RecipeList = () => {
  const { recipes, fetchRecipes } = useRecipeStore();

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  if (recipes.length === 0) {
    return (
      <div className="text-center p-6 text-gray-500">
        <h2 className="text-xl font-semibold">No Recipes Found</h2>
        <p className="mt-2">Start by adding a new recipe to your collection!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-bold text-gray-800">{recipe.name}</h3>
          <p className="text-gray-600 mt-2">{recipe.description}</p>

          {/* Stats */}
          <div className="flex justify-between text-sm text-gray-500 mt-4">
            <span>🍴 {recipe.ingredients?.length || 0} ingredients</span>
            <span>⏱ {recipe.cookingTime || "N/A"} mins</span>
          </div>

          {/* Favorite Button */}
          <div className="mt-4">
            <FavoriteButton recipeId={recipe.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
