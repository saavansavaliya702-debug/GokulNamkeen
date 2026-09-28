// src/pages/RecipeDetail.jsx
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import UserNavbar from "../Navbar/UserNavbar";
import AdminNavbar from "../Navbar/AdminNavbar";
import { useAuth } from "./AuthContext";
import "../Css/RecipeDetail.css";

const RECIPES_DATA = {
  1: {
    id: 1,
    title: "Surati Chai-Time Sev Sandwich",
    time: "8 min",
    difficulty: "Easy",
    serves: "2",
    image: "/images/sev-sandwich.jpg",
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
    nutrition: {
      calories: 240,
      protein: "6g",
      carbs: "28g",
      fat: "12g",
      fiber: "2g",
    },
  },
  2: {
    id: 2,
    title: "Fafda-Jalebi Sunday Brunch",
    time: "15 min",
    difficulty: "Medium",
    serves: "4",
    image: "/images/fafda-jalebi.jpg",
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
    nutrition: {
      calories: 380,
      protein: "8g",
      carbs: "52g",
      fat: "16g",
      fiber: "3g",
    },
  },
  3: {
    id: 3,
    title: "Namkeen Chivda Trail Mix",
    time: "5 min",
    difficulty: "Easy",
    serves: "6",
    image: "/images/chivda-mix.jpg",
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
    nutrition: {
      calories: 180,
      protein: "7g",
      carbs: "18g",
      fat: "9g",
      fiber: "2g",
    },
  },
  4: {
    id: 4,
    title: "Diwali Gift Basket DIY",
    time: "20 min",
    difficulty: "Easy",
    serves: "8",
    image: "/images/diwali-basket.jpg",
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
    nutrition: {
      calories: 150,
      protein: "4g",
      carbs: "16g",
      fat: "7g",
      fiber: "1g",
    },
  },
  5: {
    id: 5,
    title: "Masala Chai + Gathiya Pairing",
    time: "10 min",
    difficulty: "Easy",
    serves: "3",
    image: "/images/chai-gathiya.jpg",
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
    nutrition: {
      calories: 120,
      protein: "3g",
      carbs: "14g",
      fat: "5g",
      fiber: "1g",
    },
  },
  6: {
    id: 6,
    title: "Monsoon Bhajiya Platter",
    time: "25 min",
    difficulty: "Medium",
    serves: "4",
    image: "/images/bhajiya-platter.jpg",
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
    nutrition: {
      calories: 220,
      protein: "5g",
      carbs: "26g",
      fat: "10g",
      fiber: "2g",
    },
  },
};

const RecipeDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [servings, setServings] = useState(2);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("recipe_favorites") || "[]")
  );
  const [copied, setCopied] = useState(false);

  const recipe = RECIPES_DATA[parseInt(id)] || state?.recipe;

  if (!recipe) {
    return (
      <>
        {user?.is_admin ? <AdminNavbar /> : <UserNavbar />}
        <div className="recipe-detail-error">
          <h1>Recipe Not Found</h1>
          <p>Sorry, the recipe you're looking for doesn't exist.</p>
          <button onClick={() => navigate("/recipes")} className="rd-back-btn">
            Back to Recipes
          </button>
        </div>
      </>
    );
  }

  const toggleFavorite = () => {
    setFavorites((prev) => {
      const updated = prev.includes(recipe.id)
        ? prev.filter((id) => id !== recipe.id)
        : [...prev, recipe.id];
      localStorage.setItem("recipe_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const copyToClipboard = () => {
    const recipeText = `
${recipe.title}

Ingredients:
${recipe.ingredients.join("\n")}

Steps:
${recipe.fullSteps.map((step, i) => `${i + 1}. ${step}`).join("\n")}

Tips: ${recipe.cookingTips}
    `.trim();

    navigator.clipboard.writeText(recipeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const adjustedIngredients = recipe.ingredients.map((ing) => {
    // This is a simplified version - in a real app, you'd parse and convert quantities
    return ing;
  });

  return (
    <>
      {user?.is_admin ? <AdminNavbar /> : <UserNavbar />}

      <div className="recipe-detail-page">
        {/* Header with Navigation */}
        <button
          className="rd-back-btn"
          onClick={() => navigate("/recipes")}
          aria-label="Go back to recipes"
        >
          ← Back to Recipes
        </button>

        <div className="rd-container">
          {/* Hero Section */}
          <section className="recipe-detail-hero">
            <div className="rd-hero-image">
              <img src={recipe.image} alt={recipe.title} />
              <div className="rd-hero-overlay">
                <div className="rd-hero-info">
                  <span className="rd-category-badge">{recipe.category}</span>
                  <h1 className="rd-hero-title">{recipe.title}</h1>
                  <div className="rd-hero-stats">
                    <div className="rd-stat">
                      <span className="rd-stat-label">Difficulty</span>
                      <span className="rd-stat-value">{recipe.difficulty}</span>
                    </div>
                    <div className="rd-stat">
                      <span className="rd-stat-label">Time</span>
                      <span className="rd-stat-value">{recipe.time}</span>
                    </div>
                    <div className="rd-stat">
                      <span className="rd-stat-label">Serves</span>
                      <span className="rd-stat-value">{recipe.serves}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rd-quick-actions">
              <button
                className={`rd-action-btn rd-favorite-btn ${
                  favorites.includes(recipe.id) ? "active" : ""
                }`}
                onClick={toggleFavorite}
                aria-label={`${
                  favorites.includes(recipe.id) ? "Remove from" : "Add to"
                } favorites`}
              >
                {favorites.includes(recipe.id) ? "❤️" : "🤍"} Favorite
              </button>
              <button
                className="rd-action-btn rd-share-btn"
                onClick={copyToClipboard}
              >
                {copied ? "✓ Copied" : "📋"} {copied ? "Copied" : "Share"}
              </button>
              <button className="rd-action-btn rd-shop-btn" onClick={() => navigate("/product")}>
                🛒 Shop Product
              </button>
            </div>
          </section>

          {/* Content Section */}
          <section className="recipe-detail-content">
            {/* Left Column */}
            <div className="rd-main">
              {/* Rating Section */}
              <div className="rd-rating-section">
                <div className="rd-rating-display">
                  <span className="rd-stars">
                    {"⭐".repeat(Math.floor(recipe.rating))}
                  </span>
                  <span className="rd-rating-number">{recipe.rating}</span>
                  <span className="rd-rating-reviews">
                    ({recipe.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="rd-description-section">
                <h2>About this Recipe</h2>
                <p>{recipe.description}</p>
              </div>

              {/* Ingredients Section */}
              <div className="rd-ingredients-section">
                <div className="rd-section-header">
                  <h2>Ingredients</h2>
                  <div className="rd-servings-control">
                    <button onClick={() => setServings(Math.max(1, servings - 1))}>
                      −
                    </button>
                    <span className="rd-servings-display">
                      Serves {servings}
                    </span>
                    <button onClick={() => setServings(servings + 1)}>
                      +
                    </button>
                  </div>
                </div>

                <ul className="rd-ingredients-list">
                  {adjustedIngredients.map((ingredient, index) => (
                    <li key={index} className="rd-ingredient-item">
                      <input type="checkbox" id={`ing-${index}`} />
                      <label htmlFor={`ing-${index}`}>{ingredient}</label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions Section */}
              <div className="rd-instructions-section">
                <h2>Instructions</h2>
                <ol className="rd-instructions-list">
                  {recipe.fullSteps.map((step, index) => (
                    <li key={index} className="rd-instruction-item">
                      <div className="rd-instruction-number">{index + 1}</div>
                      <div className="rd-instruction-content">
                        <p>{step}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Cooking Tips */}
              <div className="rd-tips-section">
                <h2>💡 Chef's Tips</h2>
                <div className="rd-tips-box">
                  <p>{recipe.cookingTips}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <aside className="rd-sidebar">
              {/* Quick Info Card */}
              <div className="rd-quick-info">
                <div className="rd-quick-info-item">
                  <span className="rd-quick-info-icon">⏱</span>
                  <div>
                    <h4>Prep Time</h4>
                    <p>{recipe.time}</p>
                  </div>
                </div>
                <div className="rd-quick-info-item">
                  <span className="rd-quick-info-icon">👥</span>
                  <div>
                    <h4>Servings</h4>
                    <p>{recipe.serves} people</p>
                  </div>
                </div>
                <div className="rd-quick-info-item">
                  <span className="rd-quick-info-icon">📊</span>
                  <div>
                    <h4>Difficulty</h4>
                    <p>{recipe.difficulty}</p>
                  </div>
                </div>
              </div>

              {/* Nutrition Info */}
              <div className="rd-nutrition-card">
                <h3>Nutrition (per serving)</h3>
                <div className="rd-nutrition-grid">
                  <div className="rd-nutrition-item">
                    <span className="rd-nutrition-label">Calories</span>
                    <span className="rd-nutrition-value">
                      {recipe.nutrition?.calories || "—"}
                    </span>
                  </div>
                  <div className="rd-nutrition-item">
                    <span className="rd-nutrition-label">Protein</span>
                    <span className="rd-nutrition-value">
                      {recipe.nutrition?.protein || "—"}
                    </span>
                  </div>
                  <div className="rd-nutrition-item">
                    <span className="rd-nutrition-label">Carbs</span>
                    <span className="rd-nutrition-value">
                      {recipe.nutrition?.carbs || "—"}
                    </span>
                  </div>
                  <div className="rd-nutrition-item">
                    <span className="rd-nutrition-label">Fat</span>
                    <span className="rd-nutrition-value">
                      {recipe.nutrition?.fat || "—"}
                    </span>
                  </div>
                  <div className="rd-nutrition-item">
                    <span className="rd-nutrition-label">Fiber</span>
                    <span className="rd-nutrition-value">
                      {recipe.nutrition?.fiber || "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pairs With */}
              <div className="rd-pairs-card">
                <h3>Pairs With</h3>
                <p className="rd-pairs-text">{recipe.pair}</p>
                <button
                  className="rd-shop-product-btn"
                  onClick={() => navigate("/product")}
                >
                  Shop Now
                </button>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;