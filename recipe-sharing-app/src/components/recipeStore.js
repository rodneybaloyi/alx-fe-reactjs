import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  favorites: [],
  searchQuery: '',
  selectedCategory: 'All',
  searchTerm: '',
  filteredRecipes: [],

  addRecipe: (newRecipe) =>
    set((state) => {
      const updatedRecipes = [...state.recipes, newRecipe];
      return { 
        recipes: updatedRecipes,
        filteredRecipes: get().filterRecipesByTerm(updatedRecipes, state.searchTerm)
      };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const updatedRecipes = state.recipes.filter((r) => r.id !== id);
      return {
        recipes: updatedRecipes,
        favorites: state.favorites.filter((fid) => fid !== id),
        filteredRecipes: get().filterRecipesByTerm(updatedRecipes, state.searchTerm)
      };
    }),

  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const updatedRecipes = state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      );
      return {
        recipes: updatedRecipes,
        filteredRecipes: get().filterRecipesByTerm(updatedRecipes, state.searchTerm)
      };
    }),

  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((fid) => fid !== id)
        : [...state.favorites, id],
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setSearchTerm: (term) =>
    set((state) => {
      const filteredRecipes = get().filterRecipesByTerm(state.recipes, term);
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
      recipe.description.toLowerCase().includes(term.toLowerCase())
    );
  },

  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: get().filterRecipesByTerm(state.recipes, state.searchTerm)
    })),

  // Initialize filtered recipes when recipes are first loaded
  initializeFilteredRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes
    })),
}));