// src/App.jsx
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/AboutPage.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import Record from "./pages/Record.jsx";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/notfound.jsx";
import Contact from "./pages/ContactPage.jsx";
import Product from "./pages/ProductPage.jsx";
import Payment from "./pages/payment.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import TrackOrder from "./pages/TrackOrder.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import CustomerPage from "./pages/AdminCustomerPage.jsx";

// New Royal Heritage Pages
import HeritageBanner from "./pages/HeritageBanner.jsx";
import RecipeHub from "./pages/RecipeHub.jsx";
import FestiveOffers from "./pages/FestiveOffers.jsx";
import LoyaltyProgram from "./pages/LoyaltyProgram.jsx";

// Components
import ThemeToggle from "./components/ThemeToggle";

// Styles — IMPORT ORDER MATTERS!
import "./App.css";
import "./Css/darkmode-overrides.css";  // ⬅️ MUST BE LAST!

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    setIsAuthenticating(false);
  }, []);

  if (isAuthenticating) {
    return (
      <div className="app-loading">
        <div className="app-loading-spinner" />
        <p>Loading Gokul Namkeen…</p>
      </div>
    );
  }

  return (
    <Router>
      <ThemeToggle />
      <Routes>
        {/* ─── Public Routes ─── */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ─── New Royal Heritage Pages ─── */}
        <Route path="/heritagebanner" element={<HeritageBanner />} />
        <Route path="/heritage" element={<HeritageBanner />} />
        <Route path="/recipes" element={<RecipeHub />} />
        <Route path="/offers" element={<FestiveOffers />} />
        <Route path="/rewards" element={<LoyaltyProgram />} />

        {/* ─── Product Routes ─── */}
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />

        {/* ─── Order Tracking ─── */}
        <Route path="/track" element={<TrackOrder />} />
        <Route path="/track/:id" element={<TrackOrder />} />

        {/* ─── Admin Routes ─── */}
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/record" element={<Record />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/order" element={<AdminOrders />} />
        <Route path="/dashboard" element={<AdminDashboard />} />

        {/* ─── Fallback Redirects ─── */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
    </Router>
  );
}

export default App;