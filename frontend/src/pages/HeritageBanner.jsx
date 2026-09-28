// src/pages/HeritageBanner.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../Navbar/UserNavbar";
import AdminNavbar from "../Navbar/AdminNavbar";
import { useAuth } from "./AuthContext";
import "../Css/HeritageBanner.css";

const HERITAGE_SLIDES = [
  {
    id: 1,
    year: "1962",
    title: "A Grandmother's Recipe",
    subtitle: "The First Batch",
    description:
      "In a small kitchen in Mota Varachha, Surat, our founder's grandmother hand-roasted the first batch of Ratlami Sev using stone-ground spices and pure groundnut oil. That recipe — unchanged for 60+ years — is still the heart of every Gokul Namkeen packet.",
    image: "/images.jpg",
    stat: { value: "60+", label: "Years of the same recipe" },
    accent: "gold",
  },
  {
    id: 2,
    year: "1985",
    title: "From Kitchen to Karigar",
    subtitle: "The Family Workshop",
    description:
      "What began at home grew into a small family workshop. Three generations of karigars (craftsmen) joined hands, each mastering a different namkeen — bhujia, gathiya, chivda, and fafda — preserving techniques that machines still cannot replicate.",
    image: "/images.jpg",
    stat: { value: "3", label: "Generations of karigars" },
    accent: "maroon",
  },
  {
    id: 3,
    year: "2004",
    title: "Gokul Namkeen is Born",
    subtitle: "A Brand with a Promise",
    description:
      "We formally became Gokul Namkeen with one uncompromising promise: no palm oil, no artificial colours, no preservatives. Ever. Just pure groundnut oil, hand-ground masalas, and the patience that real flavour demands.",
    image: "/images.jpg",
    stat: { value: "0", label: "Preservatives, ever" },
    accent: "emerald",
  },
  {
    id: 4,
    year: "Today",
    title: "Serving 50,000+ Families",
    subtitle: "Still Handcrafted Daily",
    description:
      "From Surat to Singapore, from chai-time to Diwali gifting — Gokul Namkeen travels the world while every single batch is still hand-mixed, hand-roasted, and hand-packed the way it was in 1962.",
    image: "/images.jpg",
    stat: { value: "50K+", label: "Happy families worldwide" },
    accent: "saffron",
  },
];

const HeritageBanner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % HERITAGE_SLIDES.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const slide = HERITAGE_SLIDES[active];

  return (
    <>

      <div className="heritage-page">
        {/* Hero */}
        <section className="heritage-page-hero">
          <div className="rh-container">
            <span className="rh-section-tag">📜 Our Heritage</span>
            <h1 className="rh-section-title">
              A Legacy of <span className="gold-accent">Authentic Taste</span>
            </h1>
            <div className="rh-divider">
              <span className="rh-divider-icon">❋</span>
            </div>
            <p className="rh-section-sub">
              From a grandmother's kitchen to 50,000+ families worldwide —
              this is the story of Gokul Namkeen.
            </p>
          </div>
        </section>

        {/* Main heritage carousel */}
        <section className={`heritage-section accent-${slide.accent}`}>
          <div className="heritage-mandala top-left" aria-hidden="true" />
          <div className="heritage-mandala bottom-right" aria-hidden="true" />

          <div className="heritage-inner">
            <div className="heritage-content">
              <div className="heritage-eyebrow">
                <span className="heritage-year-badge">{slide.year}</span>
                <span className="heritage-subtitle">{slide.subtitle}</span>
              </div>

              <h2 className="heritage-title display-font">{slide.title}</h2>

              <p className="heritage-desc">{slide.description}</p>

              <div className="heritage-stat-row">
                <div className="heritage-stat">
                  <span className="heritage-stat-value">
                    {slide.stat.value}
                  </span>
                  <span className="heritage-stat-label">{slide.stat.label}</span>
                </div>
                <div className="heritage-divider-v" />
                <div className="heritage-trust">
                  <span className="rh-veg-badge">
                    <span className="rh-veg-icon" />
                    Pure Veg
                  </span>
                  <span className="heritage-trust-text">
                    FSSAI Certified · Since 1962
                  </span>
                </div>
              </div>

              <div className="heritage-actions">
                <button
                  className="rh-btn rh-btn-gold"
                  onClick={() => navigate("/about")}
                  type="button"
                >
                  Read Full Story →
                </button>
                <button
                  className="rh-btn rh-btn-ghost"
                  onClick={() => navigate("/product")}
                  type="button"
                >
                  Taste the Legacy
                </button>
              </div>
            </div>

            <div className="heritage-visual">
              <div className="heritage-image-frame">
                <img src={slide.image} alt={slide.title} loading="lazy" />
                <div className="heritage-image-overlay" />
                <div className="heritage-seal">
                  <span className="seal-ring" />
                  <span className="seal-text">Est. 1962</span>
                </div>
              </div>

              <div className="heritage-timeline">
                {HERITAGE_SLIDES.map((s, i) => (
                  <button
                    key={s.id}
                    className={`heritage-dot ${i === active ? "active" : ""}`}
                    onClick={() => setActive(i)}
                    type="button"
                    aria-label={`Go to ${s.year}`}
                  >
                    <span className="dot-year">{s.year}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HeritageBanner;