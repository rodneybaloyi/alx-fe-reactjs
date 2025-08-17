import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  favorites: [],
  recommendations: [],
  searchQuery: '',
  selectedCategory: 'All',
  searchTerm: '',
  filteredRecipes: [],

  // Recipe CRUD operations
  addRecipe: (newRecipe) =>
    set((state) => {
      const updatedRecipes = [...state.recipes, newRecipe];
      const store = get();
      return { 
        recipes: updatedRecipes,
        filteredRecipes: store.filterRecipesByTerm(updatedRecipes, state.searchTerm),
        recommendations: store.generateRecommendations(updatedRecipes, state.favorites)
      };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const updatedRecipes = state.recipes.filter((r) => r.id !== id);
      const updatedFavorites = state.favorites.filter((fid) => fid !== id);
      const store = get();
      return {
        recipes: updatedRecipes,
        favorites: updatedFavorites,
        filteredRecipes: store.filterRecipesByTerm(updatedRecipes, state.searchTerm),
        recommendations: store.generateRecommendations(updatedRecipes, updatedFavorites)
      };
    }),

  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const updatedRecipes = state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      );
      const store = get();
      return {
        recipes: updatedRecipes,
        filteredRecipes: store.filterRecipesByTerm(updatedRecipes, state.searchTerm),
        recommendations: store.generateRecommendations(updatedRecipes, state.favorites)
      };
    }),

  // Favorites management
  addFavorite: (recipeId) =>
    set((state) => {
      if (state.favorites.includes(recipeId)) return state;
      const updatedFavorites = [...state.favorites, recipeId];
      const store = get();
      return {
        favorites: updatedFavorites,
        recommendations: store.generateRecommendations(state.recipes, updatedFavorites)
      };
    }),

  removeFavorite: (recipeId) =>
    set((state) => {
      const updatedFavorites = state.favorites.filter(id => id !== recipeId);
      const store = get();
      return {
        favorites: updatedFavorites,
        recommendations: store.generateRecommendations(state.recipes, updatedFavorites)
      };
    }),

  toggleFavorite: (recipeId) =>
    set((state) => {
      const isFavorited = state.favorites.includes(recipeId);
      const updatedFavorites = isFavorited
        ? state.favorites.filter(id => id !== recipeId)
        : [...state.favorites, recipeId];
      
      const store = get();
      return {
        favorites: updatedFavorites,
        recommendations: store.generateRecommendations(state.recipes, updatedFavorites)
      };
    }),

  // Check if recipe is favorited
  isFavorite: (recipeId) => {
    return get().favorites.includes(recipeId);
  },

  // Get favorite recipes
  getFavoriteRecipes: () => {
    const state = get();
    return state.favorites.map(id =>
      state.recipes.find(recipe => recipe.id === id)
    ).filter(Boolean);
  },

  // Search and filtering
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setSearchTerm: (term) =>
    set((state) => {
      const store = get();
      const filteredRecipes = store.filterRecipesByTerm(state.recipes, term);
      return {
        searchTerm: term,
        filteredRecipes
      };
    }),

  filterRecipesByTerm: (recipes, term) => {
    if (!term.trim()) {
      return recipes;
    }
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(term.toLowerCase()) ||
      recipe.description.toLowerCase().includes(term.toLowerCase()) ||
      (recipe.ingredients && recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(term.toLowerCase())
      ))
    );
  },

  filterRecipes: () =>
    set((state) => {
      const store = get();
      return {
        filteredRecipes: store.filterRecipesByTerm(state.recipes, state.searchTerm)
      };
    }),

  // Initialize filtered recipes when recipes are first loaded
  initializeFilteredRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes
    })),

  // Advanced recommendation system
  generateRecommendations: (recipes = null, favorites = null) => {
    const state = get();
    const currentRecipes = recipes || state.recipes;
    const currentFavorites = favorites || state.favorites;

    if (currentRecipes.length === 0 || currentFavorites.length === 0) {
      // If no favorites, recommend popular recipes (mock popularity)
      return currentRecipes
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    }

    // Get favorite recipes to analyze patterns
    const favoriteRecipes = currentFavorites.map(id =>
      currentRecipes.find(recipe => recipe.id === id)
    ).filter(Boolean);

    if (favoriteRecipes.length === 0) {
      return currentRecipes.slice(0, 3);
    }

    // Extract common keywords from favorite recipes
    const favoriteKeywords = new Set();
    favoriteRecipes.forEach(recipe => {
      // Extract keywords from title and description
      const words = (recipe.title + ' ' + recipe.description).toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 3); // Only meaningful words
      words.forEach(word => favoriteKeywords.add(word));
      
      // Add ingredients if available
      if (recipe.ingredients) {
        recipe.ingredients.forEach(ingredient => {
          const ingredientWords = ingredient.toLowerCase().split(/\s+/);
          ingredientWords.forEach(word => {
            if (word.length > 3) favoriteKeywords.add(word);
          });
        });
      }
    });

    // Score recipes based on keyword matches
    const scoredRecipes = currentRecipes
      .filter(recipe => !currentFavorites.includes(recipe.id)) // Exclude already favorited
      .map(recipe => {
        const recipeText = (recipe.title + ' ' + recipe.description).toLowerCase();
        const ingredientText = recipe.ingredients ? recipe.ingredients.join(' ').toLowerCase() : '';
        const fullText = recipeText + ' ' + ingredientText;
        
        let score = 0;
        favoriteKeywords.forEach(keyword => {
          if (fullText.includes(keyword)) {
            score += 1;
          }
        });
        
        return { ...recipe, score };
      })
      .filter(recipe => recipe.score > 0) // Only recipes with some similarity
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, 5); // Top 5 recommendations

    // If not enough scored recipes, add some random ones
    if (scoredRecipes.length < 3) {
      const remainingRecipes = currentRecipes
        .filter(recipe => 
          !currentFavorites.includes(recipe.id) && 
          !scoredRecipes.some(scored => scored.id === recipe.id)
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, 3 - scoredRecipes.length);
      
      scoredRecipes.push(...remainingRecipes);
    }

    return scoredRecipes;
  },

  // Refresh recommendations manually
  refreshRecommendations: () =>
    set((state) => {
      const store = get();
      return {
        recommendations: store.generateRecommendations(state.recipes, state.favorites)
      };
    }),

  // Get recommendation statistics
  getRecommendationStats: () => {
    const state = get();
    return {
      totalRecipes: state.recipes.length,
      favoriteCount: state.favorites.length,
      recommendationCount: state.recommendations.length,
      favoritePercentage: state.recipes.length > 0 
        ? Math.round((state.favorites.length / state.recipes.length) * 100)
        : 0
    };
  },
}));