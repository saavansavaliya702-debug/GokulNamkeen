// src/Navbar/UserNavbar.jsx
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../Css/UserNavbar.css";

/* ═══════════════════════════════════════════════════════
   NAV LINKS
   ═══════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/product", label: "Shop", icon: "🛍️" },
  { to: "/recipes", label: "Recipes", icon: "🍽️" },
  { to: "/offers", label: "Offers", icon: "🎉" },
  { to: "/track", label: "Track Order", icon: "📍" },
  { to: "/about", label: "Heritage", icon: "📜" },
  { to: "/contact", label: "Contact", icon: "📞" },
];

/* ═══════════════════════════════════════════════════════
   USER NAVBAR COMPONENT
   ═══════════════════════════════════════════════════════ */
const UserNavbar = () => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  /* ─── Top bar visibility (persisted in sessionStorage) ─── */
  const [topBarVisible, setTopBarVisible] = useState(() => {
    try {
      return sessionStorage.getItem("topBarHidden") !== "true";
    } catch {
      return true;
    }
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();

  /* ─── Handle top bar dismiss ─── */
  const handleDismissTopBar = () => {
    setTopBarVisible(false);
    try {
      sessionStorage.setItem("topBarHidden", "true");
    } catch {
      // ignore
    }
  };

  /* ─── Listen for scroll for glass blur effect ─── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ─── Cart count ─── */
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const total = cart.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0
        );
        setCartCount(total);
      } catch {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener("cart-updated", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cart-updated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  /* ─── Close menu on route change ─── */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* ─── Lock body scroll when menu is open ─── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* ─── Logout ─── */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  /* ─── Open cart ─── */
  const openCart = () => {
    setMenuOpen(false);
    navigate("/cart");
  };

  /* ─── Active route check ─── */
  const isActive = (path) => {
    if (path === "/" || path === "/home") {
      return pathname === "/" || pathname === "/home";
    }
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          TOP PROMOTIONAL ANNOUNCEMENT BAR (DISMISSIBLE)
          ═══════════════════════════════════════════════════════ */}
      {topBarVisible && (
        <div className="user-top-bar">
          <div className="user-top-bar-inner">
            <div className="top-bar-item highlight">
              <span className="sparkle">✨</span>
              <span>
                Free Shipping across Gujarat on orders above ₹500
              </span>
            </div>

            <div className="top-bar-divider">•</div>

            <div className="top-bar-item">
              <span>
                🎁 Use Code: <strong>WELCOME10</strong> for 10% OFF
              </span>
            </div>

            <div className="top-bar-divider">•</div>

            <div className="top-bar-item veg-tag">
              <span className="veg-badge-mini">
                <span className="veg-dot" />
              </span>
              <span>100% Pure Vegetarian</span>
            </div>

            <div className="top-bar-right">
              <a href="tel:+919876543210" className="top-bar-phone">
                📞 +91 98765 43210
              </a>
            </div>
          </div>

          {/* Cancel / Close button */}
          <button
            type="button"
            className="top-bar-close"
            onClick={handleDismissTopBar}
            aria-label="Dismiss announcement"
            title="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          MOBILE TOP BAR
          ═══════════════════════════════════════════════════════ */}
      <div className={`user-mobile-bar ${scrolled ? "scrolled" : ""}`}>
        <Link
          to="/home"
          className="user-mobile-brand"
          onClick={() => setMenuOpen(false)}
        >
          <div className="logo-ring">
            <img
              src="/images.jpg"
              alt="Gokul Namkeen"
              className="logo"
            />
          </div>
          <div className="mobile-brand-meta">
            <span className="gokul">Gokul Namkeen</span>
            <span className="mobile-tagline">Authentic Since 2004</span>
          </div>
        </Link>

        <div className="user-mobile-actions">
          {/* Mobile Cart */}
          <button
            type="button"
            className="cart-btn mobile"
            onClick={openCart}
            aria-label="Open cart"
          >
            <span className="cart-btn-icon">🛒</span>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>

          <button
            className={`menu-toggle ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="menu-icon">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* ─── Backdrop ─── */}
      {menuOpen && (
        <div
          className="nav-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ═══════════════════════════════════════════════════════
          MAIN DESKTOP & EXPANDED NAVBAR
          ═══════════════════════════════════════════════════════ */}
      <nav
        className={`user-navbar ${menuOpen ? "mobile-open" : ""} ${
          scrolled ? "scrolled" : ""
        }`}
      >
        <div className="nav-wrapper">
          {/* ─── Brand ─── */}
          <Link
            to="/home"
            className="nav-brand"
            onClick={() => setMenuOpen(false)}
          >
            <div className="logo-ring">
              <img
                src="/images.jpg"
                alt="Gokul Namkeen"
                className="logo"
              />
            </div>
            <div className="brand-text">
              <div className="brand-title-row">
                <span className="brand-name">Gokul Namkeen</span>
                <span
                  className="pure-veg-tag"
                  title="100% Pure Vegetarian"
                >
                  <span className="veg-box">
                    <span className="veg-circle" />
                  </span>
                  Veg
                </span>
              </div>
              <span className="brand-tagline">
                Tradition & Taste Since 2004
              </span>
            </div>
          </Link>

          {/* ─── Nav Links ─── */}
          <ul className="nav-menu">
            {NAV_LINKS.map(({ to, label, icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`nav-link ${isActive(to) ? "active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="nav-icon" aria-hidden="true">
                    {icon}
                  </span>
                  <span className="nav-label">{label}</span>
                  {isActive(to) && <span className="nav-active-pill" />}
                </Link>
              </li>
            ))}
          </ul>

          {/* ─── Right Side: Cart + User + Auth ─── */}
          <div className="nav-actions">
            {/* Cart Button */}
            <button
              type="button"
              className="cart-btn desktop"
              onClick={openCart}
              aria-label="View cart"
            >
              <div className="cart-icon-wrap">
                <span className="cart-icon">🛒</span>
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </div>
              <span className="cart-text">Cart</span>
              {cartCount > 0 && (
                <span className="cart-count-pill">{cartCount} items</span>
              )}
            </button>

            {user ? (
              <div className="user-area">
                <div className="user-chip">
                  <div className="user-avatar">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="user-meta">
                    <span className="user-name">{user.name}</span>
                    <span className="user-role">
                      {user.is_admin
                        ? "Administrator"
                        : "Valued Customer"}
                    </span>
                  </div>
                </div>

                {user.is_admin && (
                  <Link
                    to="/dashboard"
                    className="admin-shortcut-btn"
                    title="Admin Dashboard"
                  >
                    ⚙️ Admin
                  </Link>
                )}

                <button
                  className="logout-btn"
                  onClick={handleLogout}
                  type="button"
                  title="Logout"
                >
                  <span className="logout-icon">⎋</span>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link
                  to="/login"
                  className="login-btn"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="register-btn"
                  onClick={() => setMenuOpen(false)}
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNavbar;