import React, { useState, useEffect } from 'react';

const Slider = ({ items, autoPlay = true, interval = 7500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  const nextSlide = () => {
    setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  };

  return (
    <div className="slider">
      <div className="slider-container">
        {items.map((item, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="slide-content">
              <h2>{item.title}</h2>
              <div>
              <p>{item.description}</p>
              {item.features && (
                <div className="slide-features">
                  {item.features.map((feature, i) => (
                    <span key={i} className="feature-tag">{feature}</span>
                  ))}
                </div>
              )}
              {item.buttonText && (
                <button className="btn-primary" onClick={() => {
                  window.location.href = items[currentIndex].link
                }}>{item.buttonText}</button>
              )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="slider-btn prev" onClick={prevSlide}>‹</button>
      <button className="slider-btn next" onClick={nextSlide}>›</button>
      
      <div className="slider-dots">
        {items.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;