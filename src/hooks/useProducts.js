import { useState, useEffect } from 'react';
import productsData from '../media/obj/products.json';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Симуляция загрузки данных
    setLoading(true);
    setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 500);
  }, []);

  // Группировка товаров по категориям
  const categories = [...new Set(products.map(product => product.Категория))];

  // Получение товаров по категории
  const getProductsByCategory = (category) => {
    return products.filter(product => product.Категория === category);
  };

  // Получение популярных товаров (первые 4)
  const getPopularProducts = () => {
    return products.filter(product => product["Артикул продавца"] === "tf-c2" || 
        product["Артикул продавца"] === "tf-d3r" || 
        product["Артикул продавца"] === "tf-l2s-se-uv" || 
        product["Артикул продавца"] === "tf-t62" ||
        product["Артикул продавца"] === "tf-df007" ||
        product["Артикул продавца"] === "tf-minie-green");
  };

  return {
    products,
    categories,
    loading,
    getProductsByCategory,
    getPopularProducts
  };
};