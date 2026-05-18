import React, { useState } from 'react';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('dashboard');

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
          <h1>OfferSense</h1>
          <span className="brand-tagline">Analytics Dashboard</span>
        </div>
        
        <ul className="navbar-menu">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.path}
                className={`nav-link ${activeLink === link.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink(link.id);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
