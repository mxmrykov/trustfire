import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Business = () => {
  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    phone: '',
    email: '',
    message: ''
  });

  // Refs для анимаций
  const heroRef = useScrollAnimation();
  const solutionsRef = useScrollAnimation();
  const benefitsRef = useScrollAnimation();
  const formRef = useScrollAnimation();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Обработка отправки формы
    console.log('Form submitted:', formData);
    alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
  };

  return (
    <div className="business-page">
      {/* Hero Section */}
      <section ref={heroRef} className="business-hero scroll-animate">
        <div className="container">
          <div className="business-hero-content">
            <h1>Партнерская программа</h1>
            <p>Специальные условия для оптовых покупателей и корпоративных клиентов</p>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section ref={solutionsRef} className="business-solutions-section scroll-animate">
        <div className="container">
          <div className="floating-window large">
            <div className="solution-content">
              <h2>Оптовые поставки</h2>
              <div className="solution-features">
                <div className="feature-item scroll-animate-item" style={{ animationDelay: '0.1s' }}>
                  <div className="feature-icon">🎯</div>
                  <div className="feature-text">
                    <h3>Скидки до 29%</h3>
                    <p>Специальные цены для оптовых закупок</p>
                  </div>
                </div>
                <div className="feature-item scroll-animate-item" style={{ animationDelay: '0.2s' }}>
                  <div className="feature-icon">👤</div>
                  <div className="feature-text">
                    <h3>Персональный менеджер</h3>
                    <p>Индивидуальный подход к каждому партнеру</p>
                  </div>
                </div>
                <div className="feature-item scroll-animate-item" style={{ animationDelay: '0.3s' }}>
                  <div className="feature-icon">💳</div>
                  <div className="feature-text">
                    <h3>Удобные платежи</h3>
                    <p>Гибкие условия оплаты для постоянных партнеров</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="business-benefits-section scroll-animate">
        <div className="container">
          <div className="benefits-grid">
            <div className="floating-window scroll-animate-item" style={{ animationDelay: '0.1s' }}>
              <div className="benefit-card">
                <div className="benefit-icon">🚀</div>
                <h3>Быстрый старт</h3>
                <p>Минимальный порог входа для новых партнеров</p>
              </div>
            </div>
            <div className="floating-window scroll-animate-item" style={{ animationDelay: '0.2s' }}>
              <div className="benefit-card">
                <div className="benefit-icon">📦</div>
                <h3>Стабильные поставки</h3>
                <p>Гарантированное наличие товара на складе</p>
              </div>
            </div>
            <div className="floating-window scroll-animate-item" style={{ animationDelay: '0.3s' }}>
              <div className="benefit-card">
                <div className="benefit-icon">🛡️</div>
                <h3>Гарантия качества</h3>
                <p>Сертифицированная продукция с гарантией</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section ref={formRef} className="business-form-section scroll-animate">
        <div className="container">
          <div className="form-container">
            <div className="floating-window large">
              <div className="form-header">
                <h2>Стать партнером</h2>
                <p>Заполните заявку и мы свяжемся с вами для обсуждения условий сотрудничества</p>
              </div>
              <form onSubmit={handleSubmit} className="business-form">
                <div className="form-row">
                  <div className="form-group scroll-animate-item" style={{ animationDelay: '0.1s' }}>
                    <label>Название компании *</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group scroll-animate-item" style={{ animationDelay: '0.2s' }}>
                    <label>Контактное лицо *</label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group scroll-animate-item" style={{ animationDelay: '0.3s' }}>
                    <label>Телефон *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group scroll-animate-item" style={{ animationDelay: '0.4s' }}>
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group scroll-animate-item" style={{ animationDelay: '0.5s' }}>
                  <label>Дополнительная информация</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Интересующие модели, планируемые объемы закупок и т.д."
                    rows="4"
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary large scroll-animate-item" style={{ animationDelay: '0.6s' }}>
                  Отправить заявку
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Business;