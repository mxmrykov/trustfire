import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from '../components/Slider';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Home = () => {
  const navigate = useNavigate();
  const { getPopularProducts, categories, products, loading } = useProducts();
  const popularProducts = getPopularProducts();

  // Refs для анимаций
  const categoriesRef = useScrollAnimation();
  const popularRef = useScrollAnimation();
  const storesRef = useScrollAnimation();
  const aboutRef = useScrollAnimation();

  // Данные для слайдера
  const sliderItems = [
    {
      image: 'https://via.placeholder.com/1200x400/001f3f/ffffff?text=Тактические+Фонари',
      title: 'Тактические Фонари',
      description: 'Мощные и надежные решения для профессионалов',
      features: ['До 1000 люмен', 'Ударопрочные', 'Водонепроницаемые'],
      buttonText: 'Смотреть тактические'
    },
    {
      image: 'https://via.placeholder.com/1200x400/0074D9/ffffff?text=Карманные+Фонари',
      title: 'Карманные Фонари',
      description: 'Компактные и яркие для повседневного использования',
      features: ['Компактные', 'Яркие', 'Энергоэффективные'],
      buttonText: 'Смотреть карманные'
    },
    {
      image: 'https://via.placeholder.com/1200x400/001f3f/ffffff?text=Оружейные+Фонари',
      title: 'Оружейные Фонари',
      description: 'Специализированные решения для оружия',
      features: ['Прочная фиксация', 'Ударопрочные', 'Быстрый монтаж'],
      buttonText: 'Смотреть оружейные'
    }
  ];

  // Обработчик перехода в каталог с фильтром по категории
  const handleCategoryClick = (category) => {
    navigate(`/catalog?category=${encodeURIComponent(category)}`);
  };

  // Обработчик перехода в полный каталог
  const handleViewAllCatalog = () => {
    navigate('/catalog');
  };

  // Категории фонарей на основе реальных данных с правильным подсчетом
  const getCategoryCount = (category) => {
    return products.filter(p => p.Категория === category).length;
  };

  // Берем только 3 категории
  const categoryData = categories.slice(0, 3).map(category => ({
    name: category,
    count: `${getCategoryCount(category)} товаров`,
    image: 'https://via.placeholder.com/250x200/001f3f/ffffff?text=' + encodeURIComponent(category),
    description: `Фонари категории "${category}"`
  }));

  return (
    <div className="home">
      {/* Главный слайдер */}
      <section className="hero-section parallax-section">
        <div className="parallax-bg" style={{backgroundImage: 'url(https://via.placeholder.com/1920x1080/001f3f/ffffff?text=TrustFire)'}}></div>
        <Slider items={sliderItems} />
      </section>

      {/* Категории фонарей - плавающее окно */}
      <section ref={categoriesRef} className="categories-section scroll-animate">
        <div className="container">
          {loading ? (
            <div className="loading">Загрузка категорий...</div>
          ) : (
            <div className="categories-container">
              <div className="categories-window">
                <div className="section-header">
                  <h2>Категории Фонарей</h2>
                  <p>Выберите подходящий фонарь для ваших задач</p>
                </div>
                <div className="categories-grid">
                  {categoryData.map((category, index) => (
                    <div 
                      key={index} 
                      className="category-card"
                      onClick={() => handleCategoryClick(category.name)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="category-image">
                        <img src={category.image} alt={category.name} />
                      </div>
                      <div className="category-info">
                        <h3>{category.name}</h3>
                        <p>{category.description}</p>
                        <span className="category-count">{category.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Популярные фонари */}
      <section ref={popularRef} className="popular-section scroll-animate">
        <div className="container">
          <div className="section-header">
            <h2>Популярные Фонари</h2>
            <p>Самые востребованные модели</p>
          </div>
          {loading ? (
            <div className="loading">Загрузка товаров...</div>
          ) : (
            <>
              <div className="products-grid">
                {popularProducts.map((product, index) => (
                  <div 
                    key={product["Артикул продавца"]} 
                    className="scroll-animate-item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              <div className="section-actions scroll-animate-item" style={{ animationDelay: '0.4s' }}>
                <button className="btn-primary large" onClick={handleViewAllCatalog}>
                  Посмотреть весь каталог
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Магазины */}
      <section ref={storesRef} className="stores-home-section scroll-animate">
        <div className="container">
          <div className="section-header">
            <h2>Где купить</h2>
            <p>Для розничных покупок используйте наши магазины на маркетплейсах</p>
          </div>
          <div className="stores-home-grid">
            <a 
              href="https://www.wildberries.ru/seller/250012488" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="store-home-card scroll-animate-item"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="store-home-logo">
                <svg width="50" height="50" viewBox="0 0 40 40" fill="none">
                  <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#A53CFF"/>
                  <path d="M25.5 15.5H14.5C13.9477 15.5 13.5 15.9477 13.5 16.5V23.5C13.5 24.0523 13.9477 24.5 14.5 24.5H25.5C26.0523 24.5 26.5 24.0523 26.5 23.5V16.5C26.5 15.9477 26.0523 15.5 25.5 15.5Z" stroke="white" strokeWidth="1.5"/>
                  <path d="M17 18.5H23" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M17 21.5H21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="store-home-info">
                <h3>Wildberries</h3>
                <p>Официальный магазин TrustFire</p>
                <span className="store-home-link">Перейти в магазин →</span>
              </div>
            </a>

            <a 
              href="https://www.ozon.ru/seller/trustfire-2938787/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="store-home-card scroll-animate-item"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="store-home-logo">
                <svg width="50" height="50" viewBox="0 0 40 40" fill="none">
                  <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#005BFF"/>
                  <path d="M25 15H15C14.4477 15 14 15.4477 14 16V24C14 24.5523 14.4477 25 15 25H25C25.5523 25 26 24.5523 26 24V16C26 15.4477 25.5523 15 25 15Z" stroke="white" strokeWidth="1.5"/>
                  <path d="M17 18L23 22M23 18L17 22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="store-home-info">
                <h3>OZON</h3>
                <p>Официальный магазин TrustFire</p>
                <span className="store-home-link">Перейти в магазин →</span>
              </div>
            </a>
          </div>
          <div className="business-cta scroll-animate-item" style={{ animationDelay: '0.3s' }}>
            <p>Для оптовых закупок и корпоративных клиентов</p>
            <button className="btn-primary large" onClick={() => navigate('/business')}>
              Перейти в раздел "Бизнесу"
            </button>
          </div>
        </div>
      </section>

      {/* О нас с градиентом в футер */}
      <section ref={aboutRef} className="about-section-gradient scroll-animate">
        <div className="container">
          <div className="about-content-centered">
            <div className="about-text-centered">
              <h2>О TrustFire</h2>
              <p>
                TrustFire - ведущий производитель профессиональных фонарей 
                с 2010 года. Мы специализируемся на создании надежных, 
                мощных и инновационных осветительных решений для различных 
                сфер применения.
              </p>
              <div className="features-centered">
                <div className="feature scroll-animate-item" style={{ animationDelay: '0.1s' }}>
                  <h3>14+ лет</h3>
                  <p>Опыта в производстве</p>
                </div>
                <div className="feature scroll-animate-item" style={{ animationDelay: '0.2s' }}>
                  <h3>50 000+</h3>
                  <p>Довольных клиентов</p>
                </div>
                <div className="feature scroll-animate-item" style={{ animationDelay: '0.3s' }}>
                  <h3>{products.length}+</h3>
                  <p>Моделей фонарей</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;