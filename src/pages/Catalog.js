import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Catalog = () => {
  const { products, categories, loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Refs для анимаций
  const headerRef = useScrollAnimation();
  const filtersRef = useScrollAnimation();
  const productsRef = useScrollAnimation();
  
  // Состояния из query параметров
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');

  // Загрузка параметров из URL при монтировании
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const sortParam = searchParams.get('sort');

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (minPriceParam) {
      setPriceRange(prev => ({ ...prev, min: minPriceParam }));
    }
    if (maxPriceParam) {
      setPriceRange(prev => ({ ...prev, max: maxPriceParam }));
    }
    if (sortParam) {
      setSortBy(sortParam);
    }
  }, [searchParams]);

  // Обновление query параметров при изменении фильтров
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    if (priceRange.min) {
      params.set('minPrice', priceRange.min);
    }
    if (priceRange.max) {
      params.set('maxPrice', priceRange.max);
    }
    if (sortBy !== 'name') {
      params.set('sort', sortBy);
    }
    
    setSearchParams(params);
  }, [selectedCategory, priceRange, sortBy, setSearchParams]);

  // Фильтрация товаров
  const filteredProducts = products.filter(product => {
    // Фильтр по категориям
    if (selectedCategory && product.Категория !== selectedCategory) {
      return false;
    }
    
    // Фильтр по цене
    if (priceRange.min && product.Цена < parseInt(priceRange.min)) {
      return false;
    }
    if (priceRange.max && product.Цена > parseInt(priceRange.max)) {
      return false;
    }
    
    return true;
  });

  // Сортировка товаров
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.Наименование.localeCompare(b.Наименование);
      case 'category':
        return a.Категория.localeCompare(b.Категория);
      case 'price-asc':
        return (a.Цена || 0) - (b.Цена || 0);
      case 'price-desc':
        return (b.Цена || 0) - (a.Цена || 0);
      case 'article':
        return a["Артикул продавца"].localeCompare(b["Артикул продавца"]);
      default:
        return 0;
    }
  });

  const handlePriceChange = (field, value) => {
    setPriceRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSortBy('name');
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="catalog">
        <div className="container">
          <div className="catalog-header">
            <h1>Каталог Фонарей</h1>
            <p>Загрузка товаров...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="catalog">
      <div className="container">
        {/* Заголовок с анимацией */}
        <div ref={headerRef} className="catalog-header">
          <h1>Каталог Фонарей</h1>
          <p>Более {products.length} моделей профессиональных фонарей</p>
        </div>
        
        {/* Новый блок фильтров с градиентом */}
        <div ref={filtersRef} className="filters-bar">
          <div className="filter-item">
            <label>Категория</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Все категории</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>Цена, ₽</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="От"
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
              />
              <span className="price-separator">—</span>
              <input
                type="number"
                placeholder="До"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
              />
            </div>
          </div>

          <div className="filter-item">
            <label>Сортировка</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">По наименованию</option>
              <option value="price-asc">По цене (возрастание)</option>
              <option value="price-desc">По цене (убывание)</option>
              <option value="category">По категории</option>
              <option value="article">По артикулу</option>
            </select>
          </div>

          <div className="filter-actions">
            <button className="clear-filters-btn" onClick={clearFilters}>
              Сбросить
            </button>
            <div className="results-count">
              Найдено: {filteredProducts.length}
            </div>
          </div>
        </div>
        
        {/* Товары */}
        <div ref={productsRef}>
          {filteredProducts.length === 0 ? (
            <div className="catalog-placeholder">
              <h3>Товары не найдены</h3>
              <p>Попробуйте изменить параметры фильтра</p>
              <button className="btn-primary" onClick={clearFilters}>
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {sortedProducts.map((product, index) => (
                <div key={product["Артикул продавца"]}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;