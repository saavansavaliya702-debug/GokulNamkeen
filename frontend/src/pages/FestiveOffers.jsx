// src/pages/FestiveOffers.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../Css/FestiveOffers.css";
import UserNavbar from "../Navbar/UserNavbar";

const OFFERS = [
  {
    id: 1,
    badge: "Diwali Special",
    title: "Flat 25% OFF on Gift Boxes",
    code: "DIWALI25",
    desc: "Premium assorted namkeen gift hampers — perfect for family & corporate gifting.",
    valid: "Valid till 15 Nov",
    accent: "gold",
    icon: "🪔",
    minOrder: "₹999",
  },
  {
    id: 2,
    badge: "First Order",
    title: "10% OFF Your First Order",
    code: "WELCOME10",
    desc: "New to Gokul? Taste the legacy with an exclusive welcome discount.",
    valid: "No expiry",
    accent: "saffron",
    icon: "🎁",
    minOrder: "No minimum",
  },
  {
    id: 3,
    badge: "Bulk Buy",
    title: "Buy 5 Get 1 Free",
    code: "BULK5PLUS1",
    desc: "Mix & match any 5 packets and get your 6th one absolutely free.",
    valid: "Valid on 500g+ packs",
    accent: "maroon",
    icon: "📦",
    minOrder: "5+ items",
  },
  {
    id: 4,
    badge: "Weekend Deal",
    title: "Free Shipping Weekend",
    code: "FREESHIP",
    desc: "Free delivery on all orders — no minimum purchase required.",
    valid: "Sat & Sun only",
    accent: "emerald",
    icon: "🚚",
    minOrder: "No minimum",
  },
];

const FestiveOffers = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const tick = () => {
      const diff = end - Date.now();
      if (diff <= 0) {
        setTimeLeft({ h: 0, m: 0, s: 0 });
        return;
      }
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    toast.success(`Code "${code}" copied!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (<>
  
  
    <UserNavbar/>
    <section className="festive-section">
      <div className="rh-container">
        {/* Hero */}
        <header className="rh-section-head">
          <span className="rh-section-tag">🎉 Limited Time</span>
          <h2 className="rh-section-title">
            Festive <span className="gold-accent">Offers & Coupons</span>
          </h2>
          <div className="rh-divider">
            <span className="rh-divider-icon">❋</span>
          </div>
          <p className="rh-section-sub">
            Fresh deals every festival — because celebrations deserve the
            crunchiest savings.
          </p>
        </header>

        {/* Countdown */}
        <div className="festive-countdown">
          <span className="countdown-label">⏳ Today's deals end in</span>
          <div className="countdown-timer">
            <div className="countdown-unit">
              <span className="countdown-num">{pad(timeLeft.h)}</span>
              <span className="countdown-cap">Hours</span>
            </div>
            <span className="countdown-colon">:</span>
            <div className="countdown-unit">
              <span className="countdown-num">{pad(timeLeft.m)}</span>
              <span className="countdown-cap">Min</span>
            </div>
            <span className="countdown-colon">:</span>
            <div className="countdown-unit">
              <span className="countdown-num">{pad(timeLeft.s)}</span>
              <span className="countdown-cap">Sec</span>
            </div>
          </div>
        </div>

        {/* Offer cards */}
        <div className="festive-grid">
          {OFFERS.map((o, i) => (
            <article
              key={o.id}
              className={`offer-card accent-${o.accent}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="offer-ribbon">{o.badge}</div>
              <div className="offer-icon">{o.icon}</div>
              <h3 className="offer-title">{o.title}</h3>
              <p className="offer-desc">{o.desc}</p>

              <div className="offer-min-order">
                <span className="min-label">Min Order</span>
                <span className="min-value">{o.minOrder}</span>
              </div>

              <div className="offer-code-row">
                <div className="offer-code-box">
                  <span className="code-label">CODE</span>
                  <span className="code-value">{o.code}</span>
                </div>
                <button
                  className={`code-copy ${
                    copiedCode === o.code ? "copied" : ""
                  }`}
                  onClick={() => copyCode(o.code)}
                  type="button"
                  title="Copy code"
                >
                  {copiedCode === o.code ? "✓" : "📋"}
                </button>
              </div>

              <div className="offer-footer">
                <span className="offer-valid">{o.valid}</span>
                <button
                  className="offer-shop"
                  onClick={() => navigate("/product")}
                  type="button"
                >
                  Shop Now →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default FestiveOffers;