import React, { useState } from 'react';
import Link from 'next/link';
import { productData } from '@/src/source';
import { IoStarSharp } from "react-icons/io5";
import { getCartItems, saveCartItem, removeCartItem } from "@/services/cartHelpers";

interface ProductDetailsProps {
  productId?: string; 
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {  
  const staticProduct = productData[0]; 
  const dynamicProduct = productId ? productData.find((item) => item.id === parseInt(productId)) : null;
  const product = dynamicProduct || staticProduct; 
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decreaseQuantity = () => setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));

  if (!product) {
    return <p>Товар не найден</p>;
  }
   

  // Выбор контента вкладки из productData
  const getTabContent = () => {
    switch (activeTab) {
      case 'description':
        return product.description[0].split('<br><br>');
      case 'instruction':
        return product.instruction || ['Информация отсутствует.']; 
      case 'delivery':
        return product.deliveryOptions || ['Информация отсутствует.']; 
      default:
        return [];
    }
  };
 

  
  //добавление товаров в корзину
  const handleAddToCart = (product: any) => {
    saveCartItem(product);
    alert(`Товар "${product.name}" добавлен в корзину.`);
  };
    
  return (
    <section className="product-details"> 
      <div className="product-details__breadcrumb">
        <Link href="/">Главная</Link>
        {" / "}
        <Link href="/catalog">Каталог</Link>
        {" / "}
        <Link href="/category">Категория</Link>
        {" / "}
        <Link href="/subcategory">Подкатегория</Link>
        {" / "}
        <span>{product.name}</span>
      </div>

      {/* Основной блок */}
      <div className="product-details__content">
        {/* Левая часть */}
        <div className="product-details__images">          
          <div className="product-details__images">
            {product.imageThumbnails.map((thumbnail, index) => (
              <img
                key={index}
                src={thumbnail}
                alt={`${product.name} - изображение ${index + 1}`}
                className="product-details__thumbnail"
              />
            ))}
          </div>
        </div>

        {/* Правая часть */}
        <div className="product-details__info">
          <div className="product-details__header">
            <div className="product-details__rating">
                {Array.from({ length: Math.round(product.rating) }).map((_, index) => (
                    <IoStarSharp key={index} />
                ))}
            </div>
            <p className="product-details__brand">Бренд: {product.brand}</p>
            <p className="product-details__name">Наименование товара: {product.name}</p>
            <p className="product-details__article">Артикул: {product.article}</p>
            <p className="product-details__price">{product.price} {product.currency}</p>
          </div>

          {/* Вкладки */}
          <div className="product-details__tabs">
            <button
              className={`product-details__tab-description ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Описание
            </button>
            <button
              className={`product-details__tab-instruction ${activeTab === 'instruction' ? 'active' : ''}`}
              onClick={() => setActiveTab('instruction')}
            >
              Инструкция
            </button>
            <button
              className={`product-details__tab-delivery ${activeTab === 'delivery' ? 'active' : ''}`}
              onClick={() => setActiveTab('delivery')}
            >
              Доставка и оплата
            </button>
          </div>

          {/* Контент вкладки */}
          <div className="product-details__description">
            {getTabContent().map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>


          {/* Блок действий */}
          <div className="product-details__actions">
            <div className="product-details__quantity">
              <button className="quantity__button" onClick={decreaseQuantity}>-</button>
              <span className="quantity__value"><p className="quantity__value-text">{quantity}</p></span>
              <button className="quantity__button" onClick={increaseQuantity}>+</button>
            </div>
            <button className="product-details__add-to-cart">
                <p className="add-to-cart__text" 
                onClick={() => handleAddToCart({ ...product, quantity })}
                >
                  В корзину
                </p>
            </button>
            <button className="product-details__compare">
                <p className="compare__text">Сравнить</p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;

