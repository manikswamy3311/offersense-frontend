import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', path: '/' },
    { id: 'campaign', label: 'Campaign Performance', path: '/campaign' },
    { id: 'segments', label: 'Customer Segments', path: '/segments' },
    { id: 'offers', label: 'Offer Effectiveness', path: '/offers' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>OfferSense</h1>
            <span className="brand-tagline">Analytics Dashboard</span>
          </Link>
        </div>
        
        <ul className="navbar-menu">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
