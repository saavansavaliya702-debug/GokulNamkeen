// src/pages/RecipeHub.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../Navbar/UserNavbar";
import AdminNavbar from "../Navbar/AdminNavbar";
import { useAuth } from "./AuthContext";
import "../Css/RecipeHub.css";

const RECIPES = [
  {
    id: 1,
    title: "Surati Chai-Time Sev Sandwich",
    time: "8 min",
    difficulty: "Easy",
    serves: "2",
    image: "/images/sev-sandwich.jpg",
    thumbnail: "/images/sev-sandwich-thumb.jpg",
    ingredients: ["Gokul Ratlami Sev", "Butter", "Green chutney", "Bread"],
    pair: "Ratlami Sev",
    steps: 4,
    category: "Snacks",
    rating: 4.8,
    reviews: 142,
    description: "A quick and delicious chai-time treat combining crispy sev with soft bread.",
    fullSteps: [
      "Apply butter generously on two bread slices",
      "Spread green chutney evenly on the butter",
      "Layer Gokul Ratlami Sev on one slice",
      "Press slices together and serve immediately",
    ],
    cookingTips: "Use fresh sev for maximum crispness. Toast bread lightly for better texture.",
  },
  {
    id: 2,
    title: "Fafda-Jalebi Sunday Brunch",
    time: "15 min",
    difficulty: "Medium",
    serves: "4",
    image: "/images/fafda-jalebi.jpg",
    thumbnail: "/images/fafda-jalebi-thumb.jpg",
    ingredients: ["Fafda", "Jalebi", "Papaya sambharo", "Green chutney"],
    pair: "Fafda & Jalebi",
    steps: 6,
    category: "Breakfast",
    rating: 4.9,
    reviews: 289,
    description: "A traditional Gujarati brunch combining crispy fafda with sweet jalebi.",
    fullSteps: [
      "Heat oil for deep frying",
      "Prepare fafda batter with chickpea flour",
      "Fry fafda until golden brown",
      "Prepare jalebi syrup with sugar and water",
      "Fry jalebi spirals in the syrup",
      "Serve warm with papaya sambharo and green chutney",
    ],
    cookingTips: "For crispy fafda, use ice-cold water in the batter. Keep jalebi syrup warm while serving.",
  },
  {
    id: 3,
    title: "Namkeen Chivda Trail Mix",
    time: "5 min",
    difficulty: "Easy",
    serves: "6",
    image: "/images/chivda-mix.jpg",
    thumbnail: "/images/chivda-mix-thumb.jpg",
    ingredients: ["Chivda", "Roasted peanuts", "Curry leaves", "Raisins"],
    pair: "Bhavnagri Chivda",
    steps: 3,
    category: "Snacks",
    rating: 4.7,
    reviews: 98,
    description: "A quick, healthy snack mix perfect for on-the-go munching.",
    fullSteps: [
      "Mix Gokul Bhavnagri Chivda with roasted peanuts",
      "Add curry leaves and raisins",
      "Toss well and store in an airtight container",
    ],
    cookingTips: "Add chivda last to maintain crispness. Store in a dry place away from moisture.",
  },
  {
    id: 4,
    title: "Diwali Gift Basket DIY",
    time: "20 min",
    difficulty: "Easy",
    serves: "8",
    image: "/images/diwali-basket.jpg",
    thumbnail: "/images/diwali-basket-thumb.jpg",
    ingredients: ["Assorted namkeen", "Decorative box", "Ribbon", "Card"],
    pair: "Festive Combo",
    steps: 5,
    category: "Gifting",
    rating: 4.6,
    reviews: 156,
    description: "Create a beautiful gift basket filled with assorted Gokul namkeen.",
    fullSteps: [
      "Select a decorative box or basket",
      "Arrange assorted Gokul namkeen packets inside",
      "Add festive tissue paper for decoration",
      "Tie a colorful ribbon around the basket",
      "Attach a personalized greeting card",
    ],
    cookingTips: "Layer the namkeen packets for visual appeal. Use tissue paper to fill gaps.",
  },
  {
    id: 5,
    title: "Masala Chai + Gathiya Pairing",
    time: "10 min",
    difficulty: "Easy",
    serves: "3",
    image: "/images/chai-gathiya.jpg",
    thumbnail: "/images/chai-gathiya-thumb.jpg",
    ingredients: ["Gathiya", "Chai patti", "Ginger", "Cardamom"],
    pair: "Bhavnagri Gathiya",
    steps: 4,
    category: "Beverages",
    rating: 4.8,
    reviews: 203,
    description: "The perfect afternoon pairing: aromatic chai with crispy gathiya.",
    fullSteps: [
      "Boil water with ginger and cardamom",
      "Add tea leaves and let brew for 2 minutes",
      "Add milk and sugar to taste",
      "Serve hot with Gokul Bhavnagri Gathiya",
    ],
    cookingTips: "Use fresh ginger for better flavor. Brew chai at medium heat to avoid bitterness.",
  },
  {
    id: 6,
    title: "Monsoon Bhajiya Platter",
    time: "25 min",
    difficulty: "Medium",
    serves: "4",
    image: "/images/bhajiya-platter.jpg",
    thumbnail: "/images/bhajiya-platter-thumb.jpg",
    ingredients: ["Fafda", "Chutney", "Fried chillies", "Lemon"],
    pair: "Fafda",
    steps: 7,
    category: "Seasonal",
    rating: 4.9,
    reviews: 167,
    description: "A monsoon special platter with various fritters and chutneys.",
    fullSteps: [
      "Prepare batter with besan and spices",
      "Cut vegetables into small pieces",
      "Fry bhajiya until golden brown",
      "Prepare mint and tamarind chutney",
      "Arrange bhajiya on a platter",
      "Drizzle chutney generously",
      "Serve hot with lemon wedges",
    ],
    cookingTips: "Keep oil at the right temperature for crispy bhajiya. Serve immediately after frying.",
  },
];

const DIFFICULTY_LEVELS = ["All", "Easy", "Medium", "Hard"];
const CATEGORIES = ["All", "Snacks", "Breakfast", "Beverages", "Seasonal", "Gifting"];

const RecipeHub = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("recipe_favorites") || "[]")
  );
  const [sortBy, setSortBy] = useState("rating");

  // Filter and sort recipes
  const filteredRecipes = useMemo(() => {
    let filtered = RECIPES.filter((recipe) => {
      const matchesDifficulty =
        selectedDifficulty === "All" || recipe.difficulty === selectedDifficulty;
      const matchesCategory =
        selectedCategory === "All" || recipe.category === selectedCategory;
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDifficulty && matchesCategory && matchesSearch;
    });

    // Sort recipes
    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "time") {
      filtered.sort(
        (a, b) =>
          parseInt(a.time) - parseInt(b.time)
      );
    } else if (sortBy === "newest") {
      filtered.reverse();
    }

    return filtered;
  }, [selectedDifficulty, selectedCategory, searchQuery, sortBy]);

  const toggleFavorite = (recipeId) => {
    setFavorites((prev) => {
      const updated = prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId];
      localStorage.setItem("recipe_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`, { state: { recipe: RECIPES.find(r => r.id === recipeId) } });
  };

  return (
    <>
      {user?.is_admin ? <AdminNavbar /> : <UserNavbar />}

      <div className="recipe-hub-page">
        {/* Hero Section */}
        <section className="recipe-hub-hero">
          <div className="rh-container">
            <span className="rh-section-tag">🍽️ Recipe Hub</span>
            <h1 className="rh-section-title">
              Snack it <span className="gold-accent">the Gokul Way</span>
            </h1>
            <div className="rh-divider">
              <span className="rh-divider-icon">❋</span>
            </div>
            <p className="rh-section-sub">
              Quick recipes, chai-time ideas, and festive platters — all
              crafted around your favourite Gokul namkeen.
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="recipe-hub-controls-section">
          <div className="rh-container">
            <div className="rh-search-bar">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rh-search-input"
                aria-label="Search recipes by name or description"
              />
              <span className="rh-search-icon">🔍</span>
            </div>

            <div className="rh-filters-wrapper">
              {/* Difficulty Filter */}
              <div className="rh-filter-group">
                <label className="rh-filter-label">Difficulty</label>
                <div className="rh-filter-buttons">
                  {DIFFICULTY_LEVELS.map((level) => (
                    <button
                      key={level}
                      className={`rh-filter-btn ${
                        selectedDifficulty === level ? "active" : ""
                      }`}
                      onClick={() => setSelectedDifficulty(level)}
                      aria-pressed={selectedDifficulty === level}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="rh-filter-group">
                <label className="rh-filter-label">Category</label>
                <div className="rh-filter-buttons">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      className={`rh-filter-btn ${
                        selectedCategory === category ? "active" : ""
                      }`}
                      onClick={() => setSelectedCategory(category)}
                      aria-pressed={selectedCategory === category}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="rh-filter-group">
                <label htmlFor="sort-select" className="rh-filter-label">
                  Sort By
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rh-sort-select"
                >
                  <option value="rating">Top Rated</option>
                  <option value="time">Quick First</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="rh-results-info">
              <p>
                Found <strong>{filteredRecipes.length}</strong> recipe
                {filteredRecipes.length !== 1 ? "s" : ""}
              </p>
              {(selectedDifficulty !== "All" || selectedCategory !== "All" || searchQuery) && (
                <button
                  className="rh-clear-filters-btn"
                  onClick={() => {
                    setSelectedDifficulty("All");
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  aria-label="Clear all filters"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Recipe Grid Section */}
        <section className="recipe-hub-grid-section">
          <div className="rh-container">
            {filteredRecipes.length > 0 ? (
              <div className="recipe-grid">
                {filteredRecipes.map((recipe, index) => (
                  <article
                    key={recipe.id}
                    className="recipe-card"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    {/* Image Section */}
                    <div
                      className="recipe-image"
                      onClick={() => handleRecipeClick(recipe.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleRecipeClick(recipe.id);
                        }
                      }}
                      aria-label={`View ${recipe.title} recipe details`}
                    >
                      <img
                        src={recipe.thumbnail || recipe.image}
                        alt={recipe.title}
                        loading="lazy"
                      />
                      <span className="recipe-difficulty">
                        {recipe.difficulty}
                      </span>
                      <span className="recipe-steps-badge">
                        {recipe.steps} steps
                      </span>
                      <button
                        className={`recipe-favorite-btn ${
                          favorites.includes(recipe.id) ? "active" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(recipe.id);
                        }}
                        aria-label={`${
                          favorites.includes(recipe.id)
                            ? "Remove from"
                            : "Add to"
                        } favorites`}
                        title={`${
                          favorites.includes(recipe.id)
                            ? "Remove from"
                            : "Add to"
                        } favorites`}
                      >
                        {favorites.includes(recipe.id) ? "❤️" : "🤍"}
                      </button>
                    </div>

                    {/* Body Section */}
                    <div className="recipe-body">
                      {/* Rating */}
                      <div className="recipe-rating">
                        <span className="recipe-stars">
                          {"⭐".repeat(Math.floor(recipe.rating))}
                        </span>
                        <span className="recipe-rating-value">
                          {recipe.rating}
                        </span>
                        <span className="recipe-reviews">
                          ({recipe.reviews})
                        </span>
                      </div>

                      {/* Meta Information */}
                      <div className="recipe-meta">
                        <span className="recipe-meta-item" title="Cooking time">
                          ⏱ {recipe.time}
                        </span>
                        <span className="recipe-meta-item" title="Number of servings">
                          👥 Serves {recipe.serves}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="recipe-title">{recipe.title}</h3>

                      {/* Description */}
                      <p className="recipe-description">{recipe.description}</p>

                      {/* Ingredients */}
                      <div className="recipe-ingredients">
                        {recipe.ingredients.map((ingredient) => (
                          <span key={ingredient} className="ingredient-chip">
                            {ingredient}
                          </span>
                        ))}
                      </div>

                      {/* Category Badge */}
                      <span className="recipe-category-badge">
                        {recipe.category}
                      </span>

                      {/* Footer */}
                      <div className="recipe-footer">
                        <span className="recipe-pair">
                          Pairs with <strong>{recipe.pair}</strong>
                        </span>
                        <div className="recipe-button-group">
                          <button
                            className="recipe-btn recipe-view-btn"
                            onClick={() => handleRecipeClick(recipe.id)}
                            type="button"
                            aria-label={`View full recipe for ${recipe.title}`}
                          >
                            View Recipe
                          </button>
                          <button
                            className="recipe-btn recipe-shop-btn"
                            onClick={() => navigate("/product")}
                            type="button"
                            aria-label={`Shop for ${recipe.pair}`}
                          >
                            Shop
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rh-no-results">
                <span className="rh-no-results-icon">🔍</span>
                <h2>No recipes found</h2>
                <p>
                  Try adjusting your filters or search query to find what you're
                  looking for.
                </p>
                <button
                  className="rh-reset-btn"
                  onClick={() => {
                    setSelectedDifficulty("All");
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default RecipeHub;