import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import logo from "../media/logo/tf-wide.jpg"

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="TrustFire" className="logo-image" />
              <span className="logo-subtitle">PROFESSIONAL LIGHTS</span>
            </Link>
          </div>
          <Navigation />
          {/* Убрана кнопка логина */}
        </div>
      </div>
    </header>
  );
};

export default Header;