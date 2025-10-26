import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            ГЛАВНАЯ
          </Link>
        </li>
        <li>
          <Link 
            to="/catalog" 
            className={location.pathname === '/catalog' ? 'active' : ''}
          >
            КАТАЛОГ
          </Link>
        </li>
        <li>
          <Link 
            to="/business" 
            className={location.pathname === '/business' ? 'active' : ''}
          >
            БИЗНЕСУ
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;