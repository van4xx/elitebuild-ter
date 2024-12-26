import React, { useState, useEffect } from "react";
import { paymentMethods, defaultContactData } from "@/src/source";
import Link from "next/link";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckboxSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { getSavedProducts, saveProduct, removeProduct } from "@/services/storageHelpers";
import { getCartItems, saveCartItem, updateCartItem, removeCartItem } from "@/services/cartHelpers";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";


const CartComponent: React.FC = () => {
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number | null>(null);
  const [contactData, setContactData] = useState(defaultContactData);
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // Selected items
  const [likedProducts, setLikedProducts] = useState<Record<number, boolean>>({});
  const [savedProducts, setSavedProducts] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const saved = getSavedProducts();
    setSavedProducts(saved);
    const liked = saved.reduce((acc: Record<number, boolean>, product: any) => {
      acc[product.id] = true;
      return acc;
    }, {});
    setLikedProducts(liked);
  }, []);

  const toggleLike = (product: any) => {
    const isLiked = likedProducts[product.id];
    if (isLiked) {
      removeProduct(product.id);
      setLikedProducts((prev) => ({ ...prev, [product.id]: false }));
      setSavedProducts((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      saveProduct(product);
      setLikedProducts((prev) => ({ ...prev, [product.id]: true }));
      setSavedProducts((prev) => [...prev, product]);
    }
  };

  //для выделения/снятия выделения всех товаров в корзине.
  /*Если все товары уже выделены (selectedAll равно true), она очищает массив selectedItems,
   чтобы снять выделение.
  Если товары не выделены (selectedAll равно false), она добавляет в selectedItems все
   идентификаторы товаров из cartItems.*/
  const handleSelectAll = () => {
    if (selectedAll) {
      setSelectedItems([]); 
    } else {
      setSelectedItems(cartItems.map((item) => item.id)); 
    }
    setSelectedAll(!selectedAll);
  };
  

  const handleToggleItemSelection = (index: number) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((id) => id !== index) : [...prev, index]
    );
  };

  const handlePaymentMethodChange = (index: number) => {
    setSelectedPaymentMethod(index);
  };

  const handleContactInputChange = (field: keyof typeof contactData, value: string) => {
    setContactData((prev) => ({ ...prev, [field]: value }));
  };

  // Загрузка данных из localStorage при изменении
  useEffect(() => {
    const savedCart = getCartItems();
    setCartItems(savedCart);
  }, [cartItems]);

  

  //функции управления корзиной:
  const handleIncreaseQuantity = (id: number) => {
    updateCartItem(id, 1);
    setCartItems(getCartItems());
  };
  
  const handleDecreaseQuantity = (id: number) => {
    updateCartItem(id, -1);
    setCartItems(getCartItems());
  };
  
  const handleRemoveItem = (id: number) => {
    removeCartItem(id);
    setCartItems(getCartItems());
  };
  
  //удаление всех выбранных товаров
  /*Удаляет из cartItems только те товары, которые находятся в массиве selectedItems.
  Обновляет корзину как в состоянии cartItems, так и в localStorage.
  Очищает массив selectedItems, так как после удаления выделять будет нечего
  */
  const handleRemoveSelectedItems = () => {
    const updatedCartItems = cartItems.filter(
      (item) => !selectedItems.includes(item.id)
    );
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
    setSelectedItems([]);
  };


  
  return (
    <section className="cart">
      <div className="cart__breadcrumb">
        <Link href="/">Главная</Link>
        {" / "}
        <span>Корзина</span>
      </div>

      <h1 className="cart__title">Корзина</h1>

      <div className="cart__header">
        <div onClick={handleSelectAll} className="cart__select-all">
          {selectedAll ? (
            <IoCheckboxSharp className="cart__icon-checked" />
          ) : (
            <MdCheckBoxOutlineBlank className="cart__icon-unchecked" />
          )}
          <label>Выделить все</label>
        </div>
        <button
          className="cart__delete-selected"
          onClick={handleRemoveSelectedItems}
        >
          <IoMdClose className="cart__icon-delete" />
          Удалить выбранное
        </button>
      </div>


      <div className="cart__items-wrapper">
        <div className="cart__items">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="cart__item">
                {/* Выбор товара */}
                <div onClick={() => handleToggleItemSelection(item.id)} className="cart__item-select">
                  {selectedItems.includes(item.id) ? (
                    <IoCheckboxSharp className="cart__icon-checked" />
                  ) : (
                    <MdCheckBoxOutlineBlank className="cart__icon-unchecked" />
                  )}
                </div>

                {/* Изображение товара и его описание */}
                <img src={item.image || "/images/product-placeholder.png"} alt={item.name} className="cart__item-image" />
                <div className="cart__item-details">
                  <p className="cart__item-name">{item.name}</p>
                  <p className="cart__item-article">Артикул: {item.article}</p>
                </div>

                {/* Цена товара */}
                <div className="cart__item-price-wrapper">
                  <p className="cart__item-price">{item.price} ₽</p>
                </div>

                {/* Количество товара */}
                <div className="cart__item-quantity">
                  <button className="cart__quantity-decrease" onClick={() => handleDecreaseQuantity(item.id)}>
                    -
                  </button>
                  <span className="cart__quantity-value">{item.quantity}</span>
                  <button className="cart__quantity-increase" onClick={() => handleIncreaseQuantity(item.id)}>
                    +
                  </button>
                </div>

                {/* Действия с товаром (избранное, удаление) */}
                <div className="cart__item-actions">
                  <button className="cart__quantity-heart" onClick={() => toggleLike(item)}>
                    {likedProducts[item.id] ? (
                      <IoHeart className="cart__quantity-heart-icon active" />
                    ) : (
                      <IoIosHeartEmpty className="cart__quantity-heart-icon" />
                    )}
                  </button>
                  <button className="cart__quantity-delete" onClick={() => handleRemoveItem(item.id)}>
                    <IoMdClose className="cart__quantity-delete-icon" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            // Блок, который остается, если корзина пуста
            <div className="cart__empty">
              <p className="cart__empty-message">Корзина пуста</p>
            </div>
          )}
        </div>

        {/* Блок с суммарными данными для товара (вес и итоговая стоимость) */}
        <div className="cart__summary">
          <div className="cart__weight">
            <p className="cart__weight-text">Вес:</p>
            <div className="cart__weight-value-wrapper">
              <p className="cart__weight-value">
                {cartItems.reduce((totalWeight, item) => {
                  const numericWeight = parseFloat(item.weight?.replace('г', '').trim()) || 0; // Извлечение числового веса
                  return totalWeight + numericWeight * item.quantity;
                }, 0)} г
              </p>
            </div>
          </div>
          <div className="cart__total-wrapper">
            <p className="cart__total-text">Итого к оплате:</p>
            <div className="cart__total-price-wrapper">
              <p className="cart__total-price">
                {cartItems.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0)} ₽
              </p>
            </div>
          </div>
          <div className="cart__checkout-button-wrapper">
            <button className="cart__checkout-button">Оформить заказ</button>
          </div>
        </div>
      </div>


      <div className="cart__delivery-method">
        <h2 className="cart__section-title">Способ доставки</h2>
        {/*<div className="cart__delivery-map">Карта пунктов выдачи СДЭК</div>*/}
        <div className="cart__delivery-map">
  <YMaps>
    <Map
      defaultState={{ center: [55.76, 37.64], zoom: 10 }}
      className="cart__delivery-map-container"
    >
      <Placemark geometry={[55.76, 37.64]} properties={{ hintContent: "Пункт выдачи СДЭК" }} />
    </Map>
  </YMaps>
</div>

      </div>

      <div className="cart__payment-method">
        <h2 className="cart__section-title">Способ оплаты</h2>
        {paymentMethods.map((method, index) => (
          <div
            key={index}
            className="cart__payment-option"
            onClick={() => handlePaymentMethodChange(index)}
          >
            {selectedPaymentMethod === index ? (
              <IoCheckboxSharp className="cart__icon-checked" />
            ) : (
              <MdCheckBoxOutlineBlank className="cart__icon-unchecked" />
            )}
            {method}
          </div>
        ))}
      </div>

      <div className="cart__contact-data">
        <h2 className="cart__section-title">Контактные данные</h2>
        <input
          type="text"
          placeholder="Имя"
          value={contactData.name}
          onChange={(e) => handleContactInputChange("name", e.target.value)}
          className="cart__contact-input"
        />
        <input
          type="tel"
          placeholder="Номер телефона"
          value={contactData.phone}
          onChange={(e) => handleContactInputChange("phone", e.target.value)}
          className="cart__contact-input"
        />
        <input
          type="email"
          placeholder="Почта"
          value={contactData.email}
          onChange={(e) => handleContactInputChange("email", e.target.value)}
          className="cart__contact-input"
        />
      </div>
    </section>
  );
};

export default CartComponent;

