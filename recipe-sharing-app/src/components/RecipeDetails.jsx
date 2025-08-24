import React from "react";
import useRecipeStore from "../recipeStore";
import FavoriteButton from "./FavoriteButton";

const RecipeDetails = ({ recipeId }) => {
  const { recipes } = useRecipeStore();
  const recipe = recipes.find((r) => r.id === recipeId);

  if (!recipe) {
    return (
      <div className="text-center p-6 text-gray-500">
        <h2 className="text-xl font-semibold">Recipe Not Found</h2>
        <p className="mt-2">Please select a recipe from the list.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800">{recipe.name}</h2>
      <p className="text-gray-600 mt-2">{recipe.description}</p>

      {/* Ingredients */}
      <div className="mt-4">
        <h3 className="font-semibold">Ingredients:</h3>
        <ul className="list-disc list-inside text-gray-700">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="mt-4">
        <h3 className="font-semibold">Instructions:</h3>
        <p className="text-gray-700">{recipe.instructions}</p>
      </div>

      {/* Cooking time + Favorite button */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-500">
          ⏱ {recipe.cookingTime || "N/A"} mins
        </span>
        <FavoriteButton recipeId={recipe.id} />
      </div>
    </div>
  );
};

export default RecipeDetails;
