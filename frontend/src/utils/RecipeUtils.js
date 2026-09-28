// src/utils/RecipeUtils.js

/**
 * Recipe Utility Functions
 * Helpers for recipe filtering, sorting, and manipulation
 */

/**
 * Filter recipes based on multiple criteria
 * @param {Array} recipes - Array of recipe objects
 * @param {string} difficulty - Filter by difficulty (All, Easy, Medium, Hard)
 * @param {string} category - Filter by category
 * @param {string} search - Search term for title or description
 * @returns {Array} Filtered recipes
 */
export const filterRecipes = (
  recipes,
  difficulty = "All",
  category = "All",
  search = ""
) => {
  return recipes.filter((recipe) => {
    const matchesDifficulty =
      difficulty === "All" || recipe.difficulty === difficulty;
    const matchesCategory =
      category === "All" || recipe.category === category;
    const matchesSearch =
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.description.toLowerCase().includes(search.toLowerCase());

    return matchesDifficulty && matchesCategory && matchesSearch;
  });
};

/**
 * Sort recipes based on criteria
 * @param {Array} recipes - Array of recipe objects
 * @param {string} sortBy - Sort criteria (rating, time, newest)
 * @returns {Array} Sorted recipes
 */
export const sortRecipes = (recipes, sortBy = "rating") => {
  const sorted = [...recipes];

  switch (sortBy) {
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);

    case "time":
      return sorted.sort(
        (a, b) => parseInt(a.time) - parseInt(b.time)
      );

    case "newest":
      return sorted.reverse();

    default:
      return sorted;
  }
};

/**
 * Get unique categories from recipes
 * @param {Array} recipes - Array of recipe objects
 * @returns {Array} Array of unique categories
 */
export const getRecipeCategories = (recipes) => {
  const categories = new Set(recipes.map((r) => r.category));
  return ["All", ...Array.from(categories)];
};

/**
 * Get unique difficulties from recipes
 * @param {Array} recipes - Array of recipe objects
 * @returns {Array} Array of unique difficulties
 */
export const getRecipeDifficulties = (recipes) => {
  const difficulties = new Set(recipes.map((r) => r.difficulty));
  return ["All", ...Array.from(difficulties)];
};

/**
 * Calculate average rating from recipes
 * @param {Array} recipes - Array of recipe objects
 * @returns {number} Average rating
 */
export const calculateAverageRating = (recipes) => {
  if (recipes.length === 0) return 0;
  const sum = recipes.reduce((acc, recipe) => acc + recipe.rating, 0);
  return (sum / recipes.length).toFixed(1);
};

/**
 * Get trending recipes (highest rated)
 * @param {Array} recipes - Array of recipe objects
 * @param {number} limit - Number of recipes to return
 * @returns {Array} Top rated recipes
 */
export const getTrendingRecipes = (recipes, limit = 3) => {
  return [...recipes].sort((a, b) => b.rating - a.rating).slice(0, limit);
};

/**
 * Get easy recipes (great for beginners)
 * @param {Array} recipes - Array of recipe objects
 * @returns {Array} Easy recipes
 */
export const getEasyRecipes = (recipes) => {
  return recipes.filter((r) => r.difficulty === "Easy");
};

/**
 * Get quick recipes (under 15 minutes)
 * @param {Array} recipes - Array of recipe objects
 * @returns {Array} Quick recipes
 */
export const getQuickRecipes = (recipes) => {
  return recipes.filter((r) => parseInt(r.time) < 15);
};

/**
 * Search recipes with fuzzy matching
 * @param {Array} recipes - Array of recipe objects
 * @param {string} query - Search query
 * @returns {Array} Matching recipes
 */
export const searchRecipes = (recipes, query) => {
  const lowerQuery = query.toLowerCase();
  return recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(lowerQuery) ||
      recipe.description.toLowerCase().includes(lowerQuery) ||
      recipe.pair.toLowerCase().includes(lowerQuery) ||
      recipe.ingredients.some((ing) =>
        ing.toLowerCase().includes(lowerQuery)
      )
  );
};

/**
 * Get recipes by difficulty level
 * @param {Array} recipes - Array of recipe objects
 * @param {string} difficulty - Difficulty level
 * @returns {Array} Recipes matching difficulty
 */
export const getRecipesByDifficulty = (recipes, difficulty) => {
  return recipes.filter((r) => r.difficulty === difficulty);
};

/**
 * Get recipes by category
 * @param {Array} recipes - Array of recipe objects
 * @param {string} category - Category name
 * @returns {Array} Recipes in category
 */
export const getRecipesByCategory = (recipes, category) => {
  return recipes.filter((r) => r.category === category);
};

/**
 * Get related recipes (by category or difficulty)
 * @param {Object} recipe - Recipe object
 * @param {Array} allRecipes - All available recipes
 * @param {number} limit - Number of related recipes to return
 * @returns {Array} Related recipes
 */
export const getRelatedRecipes = (recipe, allRecipes, limit = 3) => {
  return allRecipes
    .filter(
      (r) =>
        (r.category === recipe.category || r.difficulty === recipe.difficulty) &&
        r.id !== recipe.id
    )
    .slice(0, limit);
};

/**
 * Adjust recipe ingredients for different servings
 * Note: This is a simplified version. For real fractions, use a library
 * @param {Array} ingredients - Array of ingredient strings
 * @param {number} originalServings - Original serving size
 * @param {number} newServings - New serving size
 * @returns {Array} Adjusted ingredients
 */
export const adjustIngredientsForServings = (
  ingredients,
  originalServings,
  newServings
) => {
  const ratio = newServings / originalServings;
  return ingredients.map((ingredient) => {
    // This is a basic implementation
    // For production, parse quantities and multiply
    return ingredient; // Return as-is for now
  });
};

/**
 * Format time string
 * @param {string} timeString - Time string like "15 min"
 * @returns {object} Object with value and unit
 */
export const parseTime = (timeString) => {
  const match = timeString.match(/(\d+)\s*(\w+)/);
  if (!match) return { value: 0, unit: "min" };
  return { value: parseInt(match[1]), unit: match[2] };
};

/**
 * Get difficulty color
 * @param {string} difficulty - Difficulty level
 * @returns {string} Color value
 */
export const getDifficultyColor = (difficulty) => {
  const colors = {
    Easy: "#27ae60",
    Medium: "#ff9f43",
    Hard: "#e74c3c",
  };
  return colors[difficulty] || "#95a5a6";
};

/**
 * Format rating display
 * @param {number} rating - Rating value
 * @returns {string} Star emoji representation
 */
export const formatRating = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  return "⭐".repeat(fullStars) + (hasHalfStar ? "✨" : "");
};

/**
 * Generate recipe ID
 * @returns {number} Unique ID
 */
export const generateRecipeId = () => {
  return Math.max(0, Date.now()) + Math.floor(Math.random() * 1000);
};

/**
 * Check if recipe is favorite
 * @param {number} recipeId - Recipe ID
 * @param {Array} favorites - Array of favorite recipe IDs
 * @returns {boolean} Is favorite
 */
export const isFavorite = (recipeId, favorites = []) => {
  return favorites.includes(recipeId);
};

/**
 * Add/remove favorite
 * @param {number} recipeId - Recipe ID
 * @param {Array} favorites - Current favorites array
 * @returns {Array} Updated favorites array
 */
export const toggleFavorite = (recipeId, favorites = []) => {
  return favorites.includes(recipeId)
    ? favorites.filter((id) => id !== recipeId)
    : [...favorites, recipeId];
};

/**
 * Save favorites to localStorage
 * @param {Array} favorites - Favorites array
 * @param {string} key - LocalStorage key
 */
export const saveFavoritesToStorage = (
  favorites,
  key = "recipe_favorites"
) => {
  try {
    localStorage.setItem(key, JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to save favorites:", error);
  }
};

/**
 * Load favorites from localStorage
 * @param {string} key - LocalStorage key
 * @returns {Array} Favorites array
 */
export const loadFavoritesFromStorage = (key = "recipe_favorites") => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load favorites:", error);
    return [];
  }
};

/**
 * Export recipe as text
 * @param {Object} recipe - Recipe object
 * @returns {string} Recipe as formatted text
 */
export const exportRecipeAsText = (recipe) => {
  const text = `
╔════════════════════════════════════════╗
║ ${recipe.title.padEnd(38)}║
╚════════════════════════════════════════╝

📊 Recipe Info
  • Difficulty: ${recipe.difficulty}
  • Time: ${recipe.time}
  • Servings: ${recipe.serves}
  • Rating: ${recipe.rating} ⭐

📝 Ingredients
${recipe.ingredients.map((ing) => `  □ ${ing}`).join("\n")}

👨‍🍳 Instructions
${recipe.fullSteps.map((step, i) => `  ${i + 1}. ${step}`).join("\n")}

💡 Chef's Tips
  ${recipe.cookingTips}

🍲 Pairs with: ${recipe.pair}
  `;
  return text.trim();
};

/**
 * Export recipe as CSV
 * @param {Array} recipes - Recipes array
 * @returns {string} CSV formatted recipes
 */
export const exportRecipesAsCSV = (recipes) => {
  const headers = [
    "ID",
    "Title",
    "Category",
    "Difficulty",
    "Time",
    "Servings",
    "Rating",
    "Reviews",
  ];
  const rows = recipes.map((r) => [
    r.id,
    r.title,
    r.category,
    r.difficulty,
    r.time,
    r.serves,
    r.rating,
    r.reviews,
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${cell}"`).join(",")
    ),
  ].join("\n");

  return csv;
};

/**
 * Validate recipe object
 * @param {Object} recipe - Recipe to validate
 * @returns {boolean} Is valid
 */
export const isValidRecipe = (recipe) => {
  const required = [
    "id",
    "title",
    "time",
    "difficulty",
    "serves",
    "image",
    "ingredients",
    "pair",
    "steps",
  ];
  return required.every((field) => field in recipe && recipe[field] !== null);
};

/**
 * Get recipe statistics
 * @param {Array} recipes - Recipes array
 * @returns {Object} Statistics object
 */
export const getRecipeStats = (recipes) => {
  return {
    totalRecipes: recipes.length,
    averageRating: calculateAverageRating(recipes),
    totalReviews: recipes.reduce((sum, r) => sum + r.reviews, 0),
    easyRecipes: recipes.filter((r) => r.difficulty === "Easy").length,
    mediumRecipes: recipes.filter((r) => r.difficulty === "Medium").length,
    hardRecipes: recipes.filter((r) => r.difficulty === "Hard").length,
    categories: [...new Set(recipes.map((r) => r.category))].length,
    fastestRecipe: recipes.reduce((prev, curr) =>
      parseInt(prev.time) < parseInt(curr.time) ? prev : curr
    ),
    topRatedRecipe: recipes.reduce((prev, curr) =>
      prev.rating > curr.rating ? prev : curr
    ),
  };
};

export default {
  filterRecipes,
  sortRecipes,
  getRecipeCategories,
  getRecipeDifficulties,
  calculateAverageRating,
  getTrendingRecipes,
  getEasyRecipes,
  getQuickRecipes,
  searchRecipes,
  getRecipesByDifficulty,
  getRecipesByCategory,
  getRelatedRecipes,
  adjustIngredientsForServings,
  parseTime,
  getDifficultyColor,
  formatRating,
  generateRecipeId,
  isFavorite,
  toggleFavorite,
  saveFavoritesToStorage,
  loadFavoritesFromStorage,
  exportRecipeAsText,
  exportRecipesAsCSV,
  isValidRecipe,
  getRecipeStats,
};