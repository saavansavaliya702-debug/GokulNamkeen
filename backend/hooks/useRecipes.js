// src/hooks/useRecipes.js
import { useState, useCallback, useMemo } from "react";

/**
 * Custom hook for recipe management
 * Handles filtering, sorting, searching, and favorites
 */
export const useRecipes = (initialRecipes = []) => {
  const [recipes] = useState(initialRecipes);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("recipe_favorites") || "[]")
  );

  // Memoized filtered and sorted recipes
  const filteredRecipes = useMemo(() => {
    let filtered = recipes.filter((recipe) => {
      const matchesDifficulty =
        selectedDifficulty === "All" || recipe.difficulty === selectedDifficulty;
      const matchesCategory =
        selectedCategory === "All" || recipe.category === selectedCategory;
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDifficulty && matchesCategory && matchesSearch;
    });

    // Sort recipes
    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "time") {
      filtered.sort((a, b) => parseInt(a.time) - parseInt(b.time));
    } else if (sortBy === "newest") {
      filtered.reverse();
    }

    return filtered;
  }, [recipes, selectedDifficulty, selectedCategory, searchQuery, sortBy]);

  // Toggle favorite
  const toggleFavorite = useCallback((recipeId) => {
    setFavorites((prev) => {
      const updated = prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId];
      localStorage.setItem("recipe_favorites", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Get favorite recipes
  const favoriteRecipes = useMemo(() => {
    return recipes.filter((r) => favorites.includes(r.id));
  }, [recipes, favorites]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSelectedDifficulty("All");
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("rating");
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(recipes.map((r) => r.category));
    return ["All", ...Array.from(cats).sort()];
  }, [recipes]);

  // Get unique difficulties
  const difficulties = useMemo(() => {
    const diffs = new Set(recipes.map((r) => r.difficulty));
    const order = ["All", "Easy", "Medium", "Hard"];
    return order.filter((d) => diffs.has(d) || d === "All");
  }, [recipes]);

  return {
    // State
    filteredRecipes,
    favoriteRecipes,
    selectedDifficulty,
    selectedCategory,
    searchQuery,
    sortBy,
    favorites,
    categories,
    difficulties,

    // Setters
    setSelectedDifficulty,
    setSelectedCategory,
    setSearchQuery,
    setSortBy,

    // Methods
    toggleFavorite,
    clearFilters,
  };
};

/**
 * Custom hook for recipe detail view
 */
export const useRecipeDetail = (recipe) => {
  const [servings, setServings] = useState(recipe?.serves || 2);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Copy recipe to clipboard
  const copyToClipboard = useCallback(() => {
    const recipeText = `
${recipe.title}

Ingredients:
${recipe.ingredients.join("\n")}

Steps:
${recipe.fullSteps?.map((step, i) => `${i + 1}. ${step}`).join("\n")}

Tips: ${recipe.cookingTips}
    `.trim();

    navigator.clipboard
      .writeText(recipeText)
      .then(() => {
        setCopiedToClipboard(true);
        setTimeout(() => setCopiedToClipboard(false), 2000);
      })
      .catch((err) => console.error("Failed to copy:", err));
  }, [recipe]);

  // Adjust servings
  const adjustServings = useCallback((amount) => {
    setServings((prev) => Math.max(1, prev + amount));
  }, []);

  // Download recipe as text file
  const downloadRecipe = useCallback(() => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(
          `${recipe.title}\n\nIngredients:\n${recipe.ingredients.join(
            "\n"
          )}`
        )
    );
    element.setAttribute("download", `${recipe.title}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, [recipe]);

  return {
    servings,
    setServings,
    adjustServings,
    copiedToClipboard,
    copyToClipboard,
    downloadRecipe,
    isFavorite,
    setIsFavorite,
  };
};

/**
 * Custom hook for recipe search
 */
export const useRecipeSearch = (recipes = []) => {
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem("recipe_search_history") || "[]")
  );

  const results = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(lowerQuery) ||
        recipe.description?.toLowerCase().includes(lowerQuery) ||
        recipe.ingredients?.some((ing) =>
          ing.toLowerCase().includes(lowerQuery)
        )
    );
  }, [query, recipes]);

  const addToSearchHistory = useCallback((term) => {
    setSearchHistory((prev) => {
      const updated = [term, ...prev.filter((t) => t !== term)].slice(0, 10);
      localStorage.setItem("recipe_search_history", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem("recipe_search_history");
  }, []);

  return {
    query,
    setQuery,
    results,
    searchHistory,
    addToSearchHistory,
    clearSearchHistory,
  };
};

/**
 * Custom hook for recipe ratings
 */
export const useRecipeRatings = (recipeId) => {
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitRating = useCallback(
    (ratingValue, comment = "") => {
      // In a real app, this would send to backend
      console.log(`Rating ${recipeId}: ${ratingValue} stars - ${comment}`);
      setRating(ratingValue);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 2000);
    },
    [recipeId]
  );

  const resetRating = useCallback(() => {
    setRating(0);
    setIsSubmitted(false);
  }, []);

  return {
    rating,
    setRating,
    isSubmitted,
    submitRating,
    resetRating,
  };
};

/**
 * Custom hook for recipe filters persistence
 */
export const useRecipeFiltersStorage = (key = "recipe_filters") => {
  const [filters, setFilters] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored
        ? JSON.parse(stored)
        : {
            difficulty: "All",
            category: "All",
            sortBy: "rating",
          };
    } catch {
      return {
        difficulty: "All",
        category: "All",
        sortBy: "rating",
      };
    }
  });

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      try {
        localStorage.setItem(key, JSON.stringify(updated));
      } catch (error) {
        console.error("Failed to save filters:", error);
      }
      return updated;
    });
  }, [key]);

  const resetFilters = useCallback(() => {
    const defaultFilters = {
      difficulty: "All",
      category: "All",
      sortBy: "rating",
    };
    setFilters(defaultFilters);
    try {
      localStorage.setItem(key, JSON.stringify(defaultFilters));
    } catch (error) {
      console.error("Failed to reset filters:", error);
    }
  }, [key]);

  return {
    filters,
    updateFilters,
    resetFilters,
  };
};

/**
 * Custom hook for recipe ingredients tracking
 */
export const useRecipeIngredients = (ingredients = []) => {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleIngredient = useCallback((ingredient) => {
    setCheckedItems((prev) => ({
      ...prev,
      [ingredient]: !prev[ingredient],
    }));
  }, []);

  const checkAllIngredients = useCallback(() => {
    const newChecked = {};
    ingredients.forEach((ing) => {
      newChecked[ing] = true;
    });
    setCheckedItems(newChecked);
  }, [ingredients]);

  const uncheckAllIngredients = useCallback(() => {
    setCheckedItems({});
  }, []);

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const uncheckedIngredients = ingredients.filter(
    (ing) => !checkedItems[ing]
  );

  return {
    checkedItems,
    toggleIngredient,
    checkAllIngredients,
    uncheckAllIngredients,
    checkedCount,
    uncheckedIngredients,
    progress: (checkedCount / ingredients.length) * 100,
  };
};

/**
 * Custom hook for cooking timer
 */
export const useCookingTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = useCallback((minutes) => {
    setTime(minutes * 60);
    setIsRunning(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resumeTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  const resetTimer = useCallback(() => {
    setTime(0);
    setIsRunning(false);
  }, []);

  // Timer countdown effect
  // Note: You'll need to handle this in your component or add useEffect here
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }, []);

  return {
    time,
    isRunning,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    formatTime: formatTime(time),
  };
};

export default {
  useRecipes,
  useRecipeDetail,
  useRecipeSearch,
  useRecipeRatings,
  useRecipeFiltersStorage,
  useRecipeIngredients,
  useCookingTimer,
};