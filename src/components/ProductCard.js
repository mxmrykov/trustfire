import React, { useState } from 'react';

const ProductCard = ({ product }) => {
  const [showDescription, setShowDescription] = useState(false);
  
  // Берем первое фото из списка
  const mainImage = product.Фото ? product.Фото.split(';')[0] : '';
  
  // Форматируем описание (разбиваем на строки)
  const descriptionLines = product.Описание ? 
    product.Описание.split('\n').filter(line => line.trim() !== '') : [];

  // Форматируем цену
  const formatPrice = (price) => {
    if (!price) return 'Цена по запросу';
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <div className="product-image-container">
        <div className="product-image">
          <img src={mainImage} alt={product.Наименование} />
          {/* Убрали бейдж "New" */}
        </div>
        
        {/* Liquid Glass описание */}
        <div className={`product-description-overlay ${showDescription ? 'visible' : ''}`}>
          <div className="liquid-glass-content">
            <h4>Описание</h4>
            <div className="description-text">
              {descriptionLines.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-name" title={product.Наименование}>
          {product.Наименование}
        </h3>
        <p className="product-category">{product.Категория}</p>
        
        {/* Цена */}
        <div className="product-price">
          <span className="current-price">{formatPrice(product.Цена)}</span>
        </div>
        
        {/* Характеристики товара */}
        <div className="product-specs">
          {product["Вес с упаковкой (кг)"] && (
            <div className="spec">
              <span className="spec-label">Вес:</span>
              <span className="spec-value">{product["Вес с упаковкой (кг)"]} кг</span>
            </div>
          )}
          {product.Размеры && (
            <div className="spec">
              <span className="spec-label">Размеры:</span>
              <span className="spec-value">
                {product.Размеры.Высота}×{product.Размеры.Длина}×{product.Размеры.Ширина} см
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;