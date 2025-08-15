import React from 'react';
import { useRecipeStore } from '../store/recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div>
      {recipes.length === 0 && <p>No recipes added yet.</p>}
      {recipes.map((recipe) => (
        <div key={recipe.id} style={{border: "1px solid #ddd", marginBottom: "1rem", padding: "1rem"}}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
