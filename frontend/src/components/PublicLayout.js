import React, { useEffect, useState } from "react";
import { FaCogs, FaHeart, FaHome, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaTruck, FaUser, FaUserCircle, FaUserEdit, FaUserPlus, FaUserShield, FaUtensils, FaUtensilSpoon } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../styles/layout.css";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useLocation } from "react-router-dom";

const PublicLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const { cartCount, setCartCount } = useCart();
  const { wishlistCount, setWishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("userName");

  const fetchCartCount = async () => {
    if (userId) {
      const res = await fetch(`http://127.0.0.1:8000/api/cart/${userId}`);
      const data = await res.json();
      setCartCount(data.length);
    }
  };

  const fetchWishlistCount = async () => {
    if (userId) {
      const res = await fetch(`http://127.0.0.1:8000/api/wishlist/${userId}`);
      const data = await res.json();
      setWishlistCount(data.length);
    }
  };

  useEffect(() => {
    if (userId) {
      setIsLoggedIn(true);
      setUserName(name);
      fetchCartCount();
      fetchWishlistCount();
    }
  }, [userId]);

  // logout
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setCartCount(0);
    setWishlistCount(0);
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold">
            <FaUtensils className="me-2" /> Deepak TasteRide
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-1">
                <Link to="/" className={`nav-link ${location.pathname === "/" ? "active-nav-link" : ""}`}>
                  <FaHome className="me-1" /> Home
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link to="/food-menu" className={`nav-link ${location.pathname === "/food-menu" ? "active-nav-link" : ""}`}>
                  <FaUtensilSpoon className="me-1" /> Menu
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link to="/track" className={`nav-link ${location.pathname === "/track" ? "active-nav-link" : ""}`}>
                  <FaTruck className="me-1" /> Track
                </Link>
              </li>
              {!isLoggedIn ? (
                <>
                  <li className="nav-item mx-1">
                    <Link to="/register" className={`nav-link ${location.pathname === "/register" ? "active-nav-link" : ""}`}>
                      <FaUserPlus className="me-1" /> Register
                    </Link>
                  </li>
                  <li className="nav-item mx-1">
                    <Link to="/login" className={`nav-link ${location.pathname === "/login" ? "active-nav-link" : ""}`}>
                      <FaSignInAlt className="me-1" /> Login
                    </Link>
                  </li>
                  <li className="nav-item mx-1">
                    <Link to="/admin-login" className={`nav-link ${location.pathname === "/admin-login" ? "active-nav-link" : ""}`}>
                      <FaUserShield className="me-1" /> Admin
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <Link to="/my-orders" className={`nav-link ${location.pathname === "/my-orders" ? "active-nav-link" : ""}`}>
                    <FaUser className="me-1" />
                    My Orders
                  </Link>
                  <Link to="/cart" className={`nav-link ${location.pathname === "/cart" ? "active-nav-link" : ""}`}>
                    <FaShoppingCart className="me-1" />
                    Cart
                    {cartCount > 0 && <span className="ms-1">({cartCount})</span>}
                  </Link>
                  <Link to="/wishlist" className={`nav-link ${location.pathname === "/wishlist" ? "active-nav-link" : ""}`}>
                    <FaHeart className="me-1" />
                    Wishlist
                    {wishlistCount > 0 && <span className="ms-1">({wishlistCount})</span>}
                  </Link>

                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <FaUserCircle className="me-1" /> {userName}
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <Link to="/profile" className="dropdown-item">
                          <FaUserEdit className="me-1" /> Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/change-password">
                          <FaCogs className="me-1" /> Setting
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          <FaSignOutAlt /> Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="min-vh-100">{children}</div>

      <footer className="footer-modern mt-auto pt-4">
        <div className="container">
          <div className="row align-items-center mb-3">
            <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
              <h5 className="mb-1">
                Deepak <span className="text-warning">TasteRide</span>
              </h5>
            </div>

            <div className="col-md-4 text-center mb-3 mb-md-0">
              <div className="footer-links">
                <Link to="/food-menu">Menu</Link>
                <Link to="/track">Track Order</Link>
                <Link to="/my-orders">My Orders</Link>
              </div>
            </div>

            <div className="col-md-4 text-center text-md-end">
              <a rel="noreferrer" target="_blank" href="https://www.instagram.com/_deepak_278?igsh=MTR4Mnp6Ym5vdm12" className="me-2 footer-social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a rel="noreferrer" target="_blank" href="https://www.facebook.com/share/1HJUsNbqrE/" className="me-2 footer-social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/deepak-maharana-3a7728325" className="me-2 footer-social-icon">
                <i className="fa-brands fa-square-linkedin"></i>
              </a>
              <a rel="noreferrer" target="_blank" href="https://github.com/deepakmaharana278" className="footer-social-icon">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          <div className="footer-bottom text-center">
            <small>&copy; {new Date().getFullYear()} Deepak TasteRide. All rights reserved.</small>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
