import React, { useEffect, useState } from "react";
import { FaCogs, FaHeart, FaHome,  FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaTruck, FaUser, FaUserCircle, FaUserEdit, FaUserPlus, FaUserShield, FaUtensils, FaUtensilSpoon } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../styles/layout.css";
import { useCart } from "../context/CartContext";

const PublicLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const {cartCount, setCartCount} = useCart();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("userName");

  const fetchCartCount = async () => {
    if (userId) {
      const res = await fetch(`http://127.0.0.1:8000/api/cart/${ userId }`);
      const data = await res.json();
      setCartCount(data.length);
    }
  }

  useEffect(() => {
    if (userId) {
      setIsLoggedIn(true);
      setUserName(name);
      fetchCartCount()
      setCartCount(0);
    }
  }, [userId]);

  // logout
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
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
                <Link to="/" className="nav-link">
                  <FaHome className="me-1" /> Home
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link to='/food-menu' className="nav-link">
                  <FaUtensilSpoon className="me-1" /> Menu
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link">
                  <FaTruck className="me-1" /> Track
                </Link>
              </li>
              {!isLoggedIn ? (
                <>
                  <li className="nav-item mx-1">
                    <Link to="/register" className="nav-link">
                      <FaUserPlus className="me-1" /> Register
                    </Link>
                  </li>
                  <li className="nav-item mx-1">
                    <Link to="/login" className="nav-link">
                      <FaSignInAlt className="me-1" /> Login
                    </Link>
                  </li>
                  <li className="nav-item mx-1">
                    <Link to="/admin-login" className="nav-link">
                      <FaUserShield className="me-1" /> Admin
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <Link to="/my-orders" className="nav-link">
                    <FaUser className="me-1" />
                    My Orders
                  </Link>
                  <Link to="/cart" className="nav-link">
                    <FaShoppingCart className="me-1" />
                    Cart
                      {cartCount > 0 && (
                        <span className="ms-1">({cartCount})</span>
                    )}
                  </Link>
                  <Link to="" className="nav-link">
                    <FaHeart className="me-1" />
                    Wishlist
                  </Link>

                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                     <FaUserCircle className="me-1"/> {userName}
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <Link to='/profile' className="dropdown-item">
                         <FaUserEdit className="me-1"/> Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/change-password">
                         <FaCogs className="me-1"/> Setting
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          <FaSignOutAlt/> Logout
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

      <div>{children}</div>

      <footer className="text-center py-3 mt-5">
        <div className="container">
          <p>&copy; 2025 Deepak TasteRide. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
