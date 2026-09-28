// src/pages/LoyaltyProgram.jsx
import { useNavigate } from "react-router-dom";
import UserNavbar from "../Navbar/UserNavbar";
import AdminNavbar from "../Navbar/AdminNavbar";
import { useAuth } from "./AuthContext";
import "../Css/LoyaltyProgram.css";

const TIERS = [
  {
    name: "Silver",
    icon: "🥈",
    threshold: "₹0 – ₹2,000",
    spend: "₹0+ spent",
    benefits: [
      "1 point per ₹10 spent",
      "Birthday surprise coupon",
      "Early access to sales",
      "Monthly recipe newsletter",
    ],
    accent: "silver",
  },
  {
    name: "Gold",
    icon: "🥇",
    threshold: "₹2,001 – ₹7,500",
    spend: "₹2,000+ spent",
    benefits: [
      "1.5 points per ₹10 spent",
      "Free delivery on all orders",
      "Exclusive Gold-only recipes",
      "Priority customer support",
      "Double points on birthdays",
    ],
    accent: "gold",
    featured: true,
  },
  {
    name: "Platinum",
    icon: "💎",
    threshold: "₹7,501+",
    spend: "₹7,500+ spent",
    benefits: [
      "2 points per ₹10 spent",
      "Free delivery + free gift wrapping",
      "VIP festive hampers",
      "Personal concierge for bulk orders",
      "Invitation to annual tasting events",
      "Early access to new launches",
    ],
    accent: "platinum",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "🛒",
    title: "Shop Your Favourites",
    desc: "Every order earns you Gokul points — the more you shop, the faster you climb.",
  },
  {
    step: "02",
    icon: "⭐",
    title: "Earn Points",
    desc: "Earn 1–2 points for every ₹10 spent depending on your tier. Points never expire.",
  },
  {
    step: "03",
    icon: "🎁",
    title: "Unlock Rewards",
    desc: "Redeem points for discounts, free products, exclusive hampers, and more.",
  },
  {
    step: "04",
    icon: "👑",
    title: "Reach New Tiers",
    desc: "Spend more to unlock Silver → Gold → Platinum, each with richer perks.",
  },
];

const LoyaltyProgram = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>

      <div className="loyalty-page">
        {/* Hero */}
        <section className="loyalty-hero">
          <div className="rh-container">
            <span className="rh-section-tag">⭐ Gokul Rewards</span>
            <h1 className="rh-section-title">
              Earn, Save & <span className="gold-accent">Celebrate</span>
            </h1>
            <div className="rh-divider">
              <span className="rh-divider-icon">❋</span>
            </div>
            <p className="rh-section-sub">
              Every crunch rewards you. Join Gokul Rewards and unlock exclusive
              perks as you shop.
            </p>

            <div className="loyalty-hero-cta">
              <button
                className="rh-btn rh-btn-gold rh-btn-lg"
                onClick={() => navigate(user ? "/product" : "/register")}
                type="button"
              >
                {user ? "Start Earning →" : "Join Free →"}
              </button>
              <button
                className="rh-btn rh-btn-ghost"
                onClick={() => navigate("/product")}
                type="button"
              >
                Browse Products
              </button>
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section className="loyalty-tiers-section">
          <div className="rh-container">
            <header className="rh-section-head">
              <span className="rh-section-tag">Membership Tiers</span>
              <h2 className="rh-section-title">
                Choose Your <span className="gold-accent">Reward Level</span>
              </h2>
              <div className="rh-divider">
                <span className="rh-divider-icon">❋</span>
              </div>
            </header>

            <div className="loyalty-tiers">
              {TIERS.map((t, i) => (
                <article
                  key={t.name}
                  className={`tier-card tier-${t.accent} ${
                    t.featured ? "is-featured" : ""
                  }`}
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  {t.featured && <div className="tier-ribbon">Most Popular</div>}

                  <div className="tier-icon">{t.icon}</div>
                  <h3 className="tier-name">{t.name}</h3>
                  <span className="tier-threshold">{t.threshold}</span>
                  <span className="tier-spend">{t.spend}</span>

                  <ul className="tier-benefits">
                    {t.benefits.map((b) => (
                      <li key={b}>
                        <span className="tier-check">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="tier-cta"
                    onClick={() => navigate(user ? "/product" : "/register")}
                    type="button"
                  >
                    {user ? `Start Earning ${t.name}` : `Join ${t.name}`} →
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="loyalty-how-section">
          <div className="rh-container">
            <header className="rh-section-head">
              <span className="rh-section-tag">How It Works</span>
              <h2 className="rh-section-title">
                Four Simple <span className="gold-accent">Steps</span>
              </h2>
              <div className="rh-divider">
                <span className="rh-divider-icon">❋</span>
              </div>
            </header>

            <div className="how-grid">
              {HOW_IT_WORKS.map((h, i) => (
                <div
                  key={h.step}
                  className="how-card"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span className="how-step">{h.step}</span>
                  <div className="how-icon">{h.icon}</div>
                  <h3 className="how-title">{h.title}</h3>
                  <p className="how-desc">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LoyaltyProgram;