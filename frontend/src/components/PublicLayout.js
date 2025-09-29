import React from "react";
import { FaHome, FaSignInAlt, FaTruck, FaUserPlus, FaUserShield, FaUtensils, FaUtensilSpoon } from "react-icons/fa";
import { Link } from "react-router-dom";
import '../styles/layout.css'

const PublicLayout = ({ children }) => {
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
                <Link className="nav-link">
                  <FaHome className="me-1" /> Home
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link">
                  <FaUtensilSpoon className="me-1" /> Menu
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link">
                  <FaTruck className="me-1" /> Track
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link">
                  <FaUserPlus className="me-1" /> Register
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link">
                  <FaSignInAlt className="me-1" /> Login
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link">
                  <FaUserShield className="me-1" /> Admin
                </Link>
              </li>
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
