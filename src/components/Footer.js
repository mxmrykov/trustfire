import React from 'react';
import { useProducts } from '../hooks/useProducts';

const Footer = () => {
  const { categories } = useProducts();
  
  // Берем первые 3 категории из реальных данных
  const footerCategories = categories.slice(0, 3);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-info">
              <h3>TrustFire</h3>
              <p className="footer-description">
                Профессиональные фонари для тактического применения, 
                спорта и повседневного использования
              </p>
              <div className="footer-stores">
                <a href="https://www.wildberries.ru/seller/250012488" target="_blank" rel="noopener noreferrer" className="footer-store-link">
                  Wildberries
                </a>
                <a href="https://www.ozon.ru/seller/trustfire-2938787/" target="_blank" rel="noopener noreferrer" className="footer-store-link">
                  OZON
                </a>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Категории</h4>
            <ul>
              {footerCategories.map((category, index) => (
                <li key={index}><a href={`/catalog?category=${encodeURIComponent(category)}`}>{category}</a></li>
              ))}
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Контакты</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <a href="mailto:m.trustfire@mail.ru">m.trustfire@mail.ru</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🕒</span>
                <span>Пн-Пт: 9:00-18:00</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 TrustFire. Все права защищены.</p>
            <div className="footer-links">
              <a href="/privacy">Политика конфиденциальности</a>
              <a href="/terms">Условия использования</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;