// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Home.css";
import api from "../utils/api";
import AdminNavbar from "../Navbar/AdminNavbar";
import UserNavbar from "../Navbar/UserNavbar";
import { useAuth } from "./AuthContext";
import Loading from "./Loading";
import { getImageUrl } from "../utils/image";

/* ═══════════════════════════════════════════════════════════════════
   STATIC DATA
   ═══════════════════════════════════════════════════════════════════ */

const TRENDING_SEARCHES = [
  "Ratlami Sev",
  "Khaman Dhokla",
  "Fafda",
  "Bhavnagri Gathiya",
  "Aloo Bhujia",
  "Moong Dal",
];

const FESTIVE_PICKS = [
  {
    icon: "🪔",
    title: "Diwali Gift Boxes",
    desc: "Curated hampers for family, friends & corporate gifting",
    tag: "Festive",
    accent: "gold",
  },
  {
    icon: "💍",
    title: "Wedding Snack Trays",
    desc: "Bulk namkeen platters for shaadi & special ceremonies",
    tag: "Bulk",
    accent: "maroon",
  },
  {
    icon: "🎒",
    title: "Kids Tiffin Pack",
    desc: "Small, mess-free snack packs loved by children",
    tag: "Kids",
    accent: "saffron",
  },
  {
    icon: "☕",
    title: "Chai-Time Combos",
    desc: "Perfect pairings for your evening cup of chai",
    tag: "Daily",
    accent: "emerald",
  },
];

const CITY_LOVE = [
  { city: "Surat", orders: "12,400+", icon: "🏙️" },
  { city: "Ahmedabad", orders: "9,850+", icon: "🏛️" },
  { city: "Mumbai", orders: "8,200+", icon: "🌊" },
  { city: "Vadodara", orders: "5,600+", icon: "🎨" },
  { city: "Rajkot", orders: "4,100+", icon: "🛕" },
  { city: "Pune", orders: "3,900+", icon: "🎓" },
];

const CRAFT_STEPS = [
  {
    step: "01",
    icon: "🌾",
    title: "Handpicked Ingredients",
    desc: "Premium gram flour, chickpea, and stone-ground spices sourced from local farmers.",
  },
  {
    step: "02",
    icon: "🔥",
    title: "Traditional Roasting",
    desc: "Slow-roasted in pure groundnut oil — never palm oil, never shortcuts.",
  },
  {
    step: "03",
    icon: "🎨",
    title: "Spice Blending",
    desc: "Grandmother's masala recipe, hand-mixed in small batches for consistency.",
  },
  {
    step: "04",
    icon: "📦",
    title: "Vacuum Sealing",
    desc: "Nitrogen-flushed packs lock in the crunch, aroma, and freshness for months.",
  },
];

const MOOD_PICKS = [
  {
    mood: "Chai Time",
    emoji: "☕",
    desc: "Light, crunchy, and slightly spicy",
    pairing: "Bhavnagri Gathiya",
    color: "amber",
  },
  {
    mood: "Movie Night",
    emoji: "🎬",
    desc: "Bold, tangy, and addictive",
    pairing: "Ratlami Sev",
    color: "maroon",
  },
  {
    mood: "Festive Joy",
    emoji: "🎉",
    desc: "Sweet + savoury combos",
    pairing: "Fafda & Jalebi",
    color: "gold",
  },
  {
    mood: "Late Night",
    emoji: "🌙",
    desc: "Fiery, spicy, cheesy",
    pairing: "Cheese Sev",
    color: "saffron",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Regular Customer · Surat",
    text: "Every festival order goes to Gokul. The taste is exactly like my grandmother's kitchen — same crunch, same aroma.",
    avatar: "P",
  },
  {
    name: "Rajesh Patel",
    role: "Bulk Buyer · Ahmedabad",
    text: "I order 50kg every month for my grocery store. Zero complaints from customers in 3 years. Delivery is always on time.",
    avatar: "R",
  },
  {
    name: "Neha Gupta",
    role: "Verified Buyer · Mumbai",
    text: "The Diwali gift box I sent to my in-laws was stunning. Beautiful packaging, premium quality — they still talk about it!",
    avatar: "N",
  },
];

const TRUST_MARKERS = [
  { value: "60+", label: "Years of recipe" },
  { value: "100%", label: "Natural ingredients" },
  { value: "50K+", label: "Happy families" },
  { value: "4.9★", label: "Average rating" },
];

const CONTACT_CARDS = [
  {
    icon: "📍",
    title: "Visit Our Factory",
    lines: ["Mota Varachha", "Surat, Gujarat 395001"],
    action: {
      label: "Get Directions →",
      href: "https://maps.google.com/?q=Mota+Varachha+Surat",
    },
  },
  {
    icon: "📞",
    title: "Talk to Us",
    lines: ["+91 98765 43210", "+91 97731 41783"],
    links: ["tel:+919876543210", "tel:+919773141783"],
    action: { label: "Call Now →", href: "tel:+919876543210" },
  },
  {
    icon: "📧",
    title: "Email Us",
    lines: ["info@gokulnamkeen.com", "bulk@gokulnamkeen.com"],
    links: ["mailto:info@gokulnamkeen.com", "mailto:bulk@gokulnamkeen.com"],
    action: { label: "Send Email →", href: "mailto:info@gokulnamkeen.com" },
  },
];

const FOOTER_EXPLORE = [
  { href: "/home", icon: "🏠", label: "Home" },
  { href: "/product", icon: "🛍️", label: "Shop All" },
  { href: "/recipes", icon: "🍽️", label: "Recipes" },
  { href: "/offers", icon: "🎉", label: "Offers" },
  { href: "/rewards", icon: "⭐", label: "Rewards" },
  { href: "/heritage", icon: "📜", label: "Heritage" },
  { href: "/track", icon: "📍", label: "Track Order" },
];

const FOOTER_CARE = [
  { href: "/about", icon: "🚚", label: "Shipping & Returns" },
  { href: "/contact", icon: "💬", label: "Bulk Orders" },
  { href: "/about", icon: "🔒", label: "Privacy Policy" },
  { href: "tel:+919876543210", icon: "📱", label: "WhatsApp Support" },
];

/* ═══════════════════════════════════════════════════════════════════
   HOME COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

const Home = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [heroSearch, setHeroSearch] = useState("");
  const [activeMood, setActiveMood] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  /* ─── Fetch products ─── */
  useEffect(() => {
    setProductsLoading(true);
    api
      .get("/products?limit=8")
      .then(({ data }) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) =>
        console.error("products fetch:", err.response?.status, err.message)
      )
      .finally(() => setProductsLoading(false));
  }, []);

  /* ─── Auto-rotate mood picks every 3.5s ─── */
  useEffect(() => {
    const id = setInterval(() => {
      setActiveMood((i) => (i + 1) % MOOD_PICKS.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  if (loading) return <Loading />;

  /* ─── Helpers ─── */
  const goToProducts = () => navigate("/product");
  const goToProduct = (id) => navigate(`/product/${id}`);
  const formatPrice = (n) => Number(n || 0).toLocaleString("en-IN");

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/product?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate("/product");
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterSubmitted(false);
        setNewsletterEmail("");
      }, 5000);
    }
  };

  return (
    <>
      {user?.is_admin ? <AdminNavbar /> : <UserNavbar />}

      <main className="home-page">
        {/* ═════════════════════════════════════════════════
            SECTION 1 — HERO (Editorial Split)
            ═════════════════════════════════════════════════ */}
        <section className="hero-v2">
          <div className="hero-v2-pattern" aria-hidden="true" />
          <div className="hero-v2-inner">
            <div className="hero-v2-content">
              <div className="hero-v2-eyebrow">
                <span className="hero-v2-dot" />
                <span>Est. 1962 · Handcrafted in Surat</span>
                <span className="hero-v2-veg">
                  <span className="veg-mark" /> Pure Veg
                </span>
              </div>

              <h1 className="hero-v2-title">
                Where <span className="hero-v2-accent">Gujarati</span>
                <br />
                Flavour Feels Like <span className="hero-v2-accent">Home</span>
              </h1>

              <p className="hero-v2-sub">
                From a grandmother's kitchen to 50,000+ families across India
                — every single pack is still hand-mixed, slow-roasted, and
                spice-blended the old-fashioned way.
              </p>

              <form className="hero-v2-search" onSubmit={handleHeroSearch}>
                <span className="hero-v2-search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search Ratlami Sev, Khaman, Fafda..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="hero-v2-search-input"
                />
                <button type="submit" className="hero-v2-search-btn">
                  Search
                </button>
              </form>

              <div className="hero-v2-trending">
                <span className="hero-v2-trending-label">🔥 Trending</span>
                <div className="hero-v2-trending-list">
                  {TRENDING_SEARCHES.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className="hero-v2-tag"
                      onClick={() =>
                        navigate(`/product?q=${encodeURIComponent(tag)}`)
                      }
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hero-v2-actions">
                <button
                  className="hero-v2-btn hero-v2-btn-primary"
                  onClick={goToProducts}
                  type="button"
                >
                  Shop All Snacks →
                </button>
                <a className="hero-v2-btn hero-v2-btn-outline" href="#craft">
                  See How We Make It
                </a>
              </div>

              <div className="hero-v2-stats">
                {TRUST_MARKERS.map((m) => (
                  <div key={m.label} className="hero-v2-stat">
                    <span className="hero-v2-stat-value">{m.value}</span>
                    <span className="hero-v2-stat-label">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-v2-visual">
              <div className="hero-v2-frame">
                <img
                  src="/images.jpg"
                  alt="Gokul Namkeen assortment"
                  loading="eager"
                />
                <span className="hero-v2-stamp">Est. 1962</span>
              </div>

              <div className="hero-v2-card hero-v2-card-top">
                <span className="hero-v2-card-icon">🥜</span>
                <div>
                  <strong>Pure Groundnut Oil</strong>
                  <p>Zero palm, zero trans fats</p>
                </div>
              </div>

              <div className="hero-v2-card hero-v2-card-bottom">
                <span className="hero-v2-card-badge">4.9★</span>
                <div>
                  <strong>Rated by 12,000+</strong>
                  <p>Surat · Mumbai · Delhi</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════
            SECTION 2 — TRUST TICKER (Marquee)
            ═════════════════════════════════════════════════ */}
        <section className="trust-v2">
          <div className="trust-v2-track">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="trust-v2-row">
                {[
                  "🌿 100% Pure Vegetarian",
                  "🔥 No Preservatives",
                  "🎁 Free Shipping above ₹500",
                  "🛡️ FSSAI Certified",
                  "📦 Vacuum Sealed",
                  "🚚 Same-Day Gujarat Dispatch",
                  "🥜 Pure Groundnut Oil",
                  "⭐ 4.9★ Rated",
                ].map((item, idx) => (
                  <span key={idx} className="trust-v2-item">
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════
            SECTION 3 — FESTIVE PICKS (Colored Cards)
            ═════════════════════════════════════════════════ */}
        <section className="festive-v2">
          <div className="home-container">
            <header className="home-head">
              <span className="home-tag home-tag-gold">🎊 Curated For You</span>
              <h2 className="home-title">
                Festive <span className="home-accent">Picks</span>
              </h2>
              <p className="home-sub">
                Handpicked collections for every celebration — from Diwali to
                weddings to everyday chai time.
              </p>
            </header>

            <div className="festive-v2-grid">
              {FESTIVE_PICKS.map((f, i) => (
                <article
                  key={f.title}
                  className={`festive-v2-card accent-${f.accent}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                  onClick={goToProducts}
                >
                  <span className="festive-v2-tag">{f.tag}</span>
                  <div className="festive-v2-icon">{f.icon}</div>
                  <h3 className="festive-v2-title">{f.title}</h3>
                  <p className="festive-v2-desc">{f.desc}</p>
                  <span className="festive-v2-link">Explore →</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════
            SECTION 4 — CRAFT PROCESS (Editorial Timeline)
            ═════════════════════════════════════════════════ */}
        <section id="craft" className="craft-v2">
          <div className="home-container">
            <header className="home-head">
              <span className="home-tag home-tag-saffron">
                🎨 The Craft
              </span>
              <h2 className="home-title">
                From <span className="home-accent">Grain to Crunch</span>
              </h2>
              <p className="home-sub">
                Four slow, patient steps that machines still can't replace.
              </p>
            </header>

            <div className="craft-v2-grid">
              {CRAFT_STEPS.map((c, i) => (
                <article key={c.step} className="craft-v2-card">
                  <span className="craft-v2-step">{c.step}</span>
                  <div className="craft-v2-icon">{c.icon}</div>
                  <h3 className="craft-v2-title">{c.title}</h3>
                  <p className="craft-v2-desc">{c.desc}</p>
                  {i < CRAFT_STEPS.length - 1 && (
                    <span className="craft-v2-arrow" aria-hidden="true">
                      →
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════
            SECTION 5 — MOOD PICKER (Interactive Tabs)
            ═════════════════════════════════════════════════ */}
        <section className="mood-v2">
          <div className="home-container">
            <header className="home-head home-head-light">
              <span className="home-tag home-tag-light">
                ✨ Shop by Mood
              </span>
              <h2 className="home-title home-title-light">
                What's Your <span className="home-accent-light">Vibe?</span>
              </h2>
              <p className="home-sub home-sub-light">
                Pick a moment, and we'll suggest the perfect namkeen.
              </p>
            </header>

            <div className="mood-v2-tabs">
              {MOOD_PICKS.map((m, i) => (
                <button
                  key={m.mood}
                  type="button"
                  className={`mood-v2-tab ${i === activeMood ? "active" : ""}`}
                  onClick={() => setActiveMood(i)}
                >
                  <span className="mood-v2-tab-emoji">{m.emoji}</span>
                  <span className="mood-v2-tab-label">{m.mood}</span>
                </button>
              ))}
            </div>

            <div className={`mood-v2-panel color-${MOOD_PICKS[activeMood].color}`}>
              <div className="mood-v2-panel-emoji">
                {MOOD_PICKS[activeMood].emoji}
              </div>
              <div className="mood-v2-panel-body">
                <span className="mood-v2-panel-mood">
                  {MOOD_PICKS[activeMood].mood}
                </span>
                <h3 className="mood-v2-panel-title">
                  {MOOD_PICKS[activeMood].desc}
                </h3>
                <p className="mood-v2-panel-pairing">
                  We recommend:{" "}
                  <strong>{MOOD_PICKS[activeMood].pairing}</strong>
                </p>
                <button
                  className="mood-v2-panel-btn"
                  onClick={goToProducts}
                  type="button"
                >
                  Shop This Mood →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════
            SECTION 6 — PRODUCTS (Bestsellers)
            ═════════════════════════════════════════════════ */}
        <section className="products-v2">
          <div className="home-container">
            <header className="home-head home-head-split">
              <div>
                <span className="home-tag home-tag-gold">🔥 Bestsellers</span>
                <h2 className="home-title">
                  Loved by <span className="home-accent">Thousands</span>
                </h2>
                <p className="home-sub">
                  Our top-selling namkeen, straight from the wok.
                </p>
              </div>
              {products.length > 0 && (
                <button
                  className="home-viewall"
                  onClick={goToProducts}
                  type="button"
                >
                  View All →
                </button>
              )}
            </header>

            {productsLoading ? (
              <div className="products-v2-loading">
                <div className="products-v2-spinner" />
                <p>Freshly roasting your picks…</p>
              </div>
            ) : products.length === 0 ? (
              <div className="products-v2-empty">
                <span className="products-v2-empty-emoji">🥨</span>
                <h3>Fresh batch coming soon</h3>
                <p>Our karigars are hard at work. Check back shortly.</p>
                <button
                  className="home-btn home-btn-primary"
                  onClick={goToProducts}
                  type="button"
                >
                  Browse Catalogue
                </button>
              </div>
            ) : (
              <>
                <div className="products-v2-grid">
                  {products.slice(0, 8).map((p) => {
                    const outOfStock = p.stock === 0;
                    return (
                      <article
                        key={p.id}
                        className={`products-v2-card ${
                          outOfStock ? "is-out" : ""
                        }`}
                      >
                        <div
                          className="products-v2-clickable"
                          onClick={() => goToProduct(p.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              goToProduct(p.id);
                            }
                          }}
                        >
                          <div className="products-v2-image">
                            {p.image ? (
                              <img
                                src={
                                  typeof getImageUrl === "function"
                                    ? getImageUrl(p.image)
                                    : p.image
                                }
                                alt={p.name}
                                loading="lazy"
                              />
                            ) : (
                              <span className="products-v2-fallback">🌾</span>
                            )}

                            {outOfStock && (
                              <span className="products-v2-badge out">
                                Sold Out
                              </span>
                            )}
                            {!outOfStock && p.stock < 10 && p.stock > 0 && (
                              <span className="products-v2-badge low">
                                Only {p.stock} left
                              </span>
                            )}
                          </div>

                          <div className="products-v2-body">
                            {p.category && (
                              <span className="products-v2-cat">
                                {p.category}
                              </span>
                            )}
                            <h3 className="products-v2-name">{p.name}</h3>
                            <div className="products-v2-meta">
                              <span className="products-v2-price">
                                ₹{formatPrice(p.price)}
                              </span>
                              <div className="products-v2-tags">
                                {p.weight != null && p.weight !== "" && (
                                  <span className="products-v2-tag-pill">
                                    {p.weight}
                                    {p.weightUnit || "g"}
                                  </span>
                                )}
                                {Number(p.pcs) > 0 && (
                                  <span className="products-v2-tag-pill">
                                    {p.pcs} pcs
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="products-v2-actions">
                          <button
                            type="button"
                            className="products-v2-btn"
                            disabled={outOfStock}
                            onClick={(e) => {
                              e.stopPropagation();
                              goToProduct(p.id);
                            }}
                          >
                            {outOfStock ? "Notify Me" : "View Details"}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════
            SECTION 7 — CITY LOVE (Map-style grid)
            ═════════════════════════════════════════════════ */}
        <section className="city-v2">
          <div className="home-container">
            <header className="home-head">
              <span className="home-tag home-tag-emerald">📍 Where We Ship</span>
              <h2 className="home-title">
                Loved Across <span className="home-accent">India</span>
              </h2>
              <p className="home-sub">
                Join families from these cities enjoying Gokul Namkeen daily.
              </p>
            </header>

            <div className="city-v2-grid">
              {CITY_LOVE.map((c, i) => (
                <div
                  key={c.city}
                  className="city-v2-card"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <span className="city-v2-icon">{c.icon}</span>
                  <span className="city-v2-name">{c.city}</span>
                  <span className="city-v2-orders">{c.orders} orders</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════
            SECTION 8 — TESTIMONIALS (Editorial Magazine)
            ═════════════════════════════════════════════════ */}
        <section className="quotes-v2">
          <div className="home-container">
            <header className="home-head">
              <span className="home-tag home-tag-maroon">💬 Real Reviews</span>
              <h2 className="home-title">
                Words From Our <span className="home-accent">Kitchens</span>
              </h2>
            </header>

            <div className="quotes-v2-grid">
              {TESTIMONIALS.map((t, i) => (
                <article
                  key={t.name}
                  className="quotes-v2-card"
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  <span className="quotes-v2-mark">"</span>
                  <div className="quotes-v2-stars">★★★★★</div>
                  <p className="quotes-v2-text">{t.text}</p>
                  <footer className="quotes-v2-footer">
                    <span className="quotes-v2-avatar">{t.avatar}</span>
                    <div className="quotes-v2-meta">
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════
            SECTION 9 — CONTACT (3-Column cards)
            ═════════════════════════════════════════════════ */}
        <section className="reach-v2">
          <div className="home-container">
            <header className="home-head">
              <span className="home-tag home-tag-gold">📮 Reach Us</span>
              <h2 className="home-title">
                Let's <span className="home-accent">Talk Snacks</span>
              </h2>
            </header>

            <div className="reach-v2-grid">
              {CONTACT_CARDS.map((c) => (
                <article key={c.title} className="reach-v2-card">
                  <div className="reach-v2-icon">{c.icon}</div>
                  <h3 className="reach-v2-title">{c.title}</h3>
                  <p className="reach-v2-lines">
                    {c.lines.map((line, i) => (
                      <span key={line}>
                        {c.links?.[i] ? (
                          <a href={c.links[i]} className="reach-v2-link">
                            {line}
                          </a>
                        ) : (
                          line
                        )}
                        {i < c.lines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  <a
                    className="reach-v2-action"
                    href={c.action.href}
                    target={
                      c.action.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      c.action.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {c.action.label}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════
            SECTION 10 — NEWSLETTER (Full-bleed dark banner)
            ═════════════════════════════════════════════════ */}
        <section className="news-v2">
          <div className="news-v2-inner">
            <div className="news-v2-badge">🎁 Snack Club</div>
            <h2 className="news-v2-title">
              Get <span className="news-v2-accent">10% Off</span> Your First
              Order
            </h2>
            <p className="news-v2-sub">
              Join 12,000+ members. Get festive drops, new-flavour alerts, and
              a welcome coupon instantly.
            </p>

            <form className="news-v2-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                required
                placeholder="Enter your email..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="news-v2-input"
              />
              <button type="submit" className="news-v2-btn">
                Unlock Code
              </button>
            </form>

            {newsletterSubmitted && (
              <div className="news-v2-success">
                🎉 Use code <strong>WELCOME10</strong> at checkout for 10%
                off!
              </div>
            )}

            <div className="news-v2-footnote">
              No spam. Unsubscribe anytime.
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════
            FOOTER
            ═════════════════════════════════════════════════ */}
        <footer className="foot-v2">
          <div className="foot-v2-content">
            <div className="foot-v2-brand">
              <div className="foot-v2-brand-title">
                <h4>Gokul Namkeen</h4>
                <span className="foot-v2-veg">🌱 100% Pure Veg</span>
              </div>
              <p>
                Authentic Gujarati snacks, farsan & sweets — handcrafted in
                Surat since 1962.
              </p>
              <div className="foot-v2-contact">
                <span>📍 Mota Varachha, Surat, Gujarat 395001</span>
                <span>📞 +91 98765 43210 · +91 97731 41783</span>
                <span>📧 info@gokulnamkeen.com</span>
              </div>
              <div className="foot-v2-fssai">
                🛡️ FSSAI Certified · 100% Food Grade Packaging
              </div>
            </div>

            <div className="foot-v2-col">
              <h4>Explore</h4>
              <ul>
                {FOOTER_EXPLORE.map((l) => (
                  <li key={`${l.href}-${l.label}`}>
                    <a href={l.href}>
                      <span>{l.icon}</span> {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="foot-v2-col">
              <h4>Customer Care</h4>
              <ul>
                {FOOTER_CARE.map((l) => (
                  <li key={`${l.href}-${l.label}`}>
                    <a href={l.href}>
                      <span>{l.icon}</span> {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="foot-v2-col">
              <h4>Stay Connected</h4>
              <p className="foot-v2-connect">
                Follow us for recipe drops, festival specials & behind-the-scenes.
              </p>
              <div className="foot-v2-social">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="foot-v2-social-link"
                  aria-label="Facebook"
                >
                  📘 Facebook
                </a>
                <a
                  href="https://www.instagram.com/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="foot-v2-social-link"
                  aria-label="Instagram"
                >
                  📸 Instagram
                </a>
              </div>
              <div className="foot-v2-pay">
                <span className="foot-v2-pay-label">We Accept:</span>
                <div className="foot-v2-pay-chips">
                  {["UPI", "GPay", "PhonePe", "RuPay", "Cards", "COD"].map(
                    (p) => (
                      <span key={p} className="foot-v2-chip">
                        {p}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="foot-v2-bottom">
            <p>
              © {new Date().getFullYear()} Gokul Namkeen. Handcrafted in Surat,
              Gujarat.
            </p>
            <p className="foot-v2-tag">Taste the tradition since 1962 ❤️</p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Home;