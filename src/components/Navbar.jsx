import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <span className="logo-icon">📅</span>
            <span className="logo-text">EventHub</span>
          </Link>

          <button className="menu-toggle" onClick={toggleMenu}>
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          </button>

          <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <Link to="/" onClick={closeMenu}>Home</Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMenu}>About</Link>
            </li>
            <li>
              <Link to="/events" onClick={closeMenu}>Events</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/create-event" onClick={closeMenu}>Create Event</Link>
                </li>
                {user?.role === 'admin' && (
                  <li>
                    <Link to="/admin" onClick={closeMenu}>Admin</Link>
                  </li>
                )}
                <li className="user-menu">
                  <span className="user-name">{user?.username || user?.email}</span>
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/create-event" onClick={closeMenu}>Create Event</Link>
                </li>
                <li>
                  <Link to="/contact" onClick={closeMenu}>Contact</Link>
                </li>
                <li>
                  <Link to="/login" onClick={closeMenu} className="login-link">Login</Link>
                </li>
                <li>
                  <Link to="/signup" onClick={closeMenu} className="signup-link">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
