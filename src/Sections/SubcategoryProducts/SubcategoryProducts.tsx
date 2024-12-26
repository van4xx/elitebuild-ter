import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { productData, manufacturers, colors } from '@/src/source';
import Link from 'next/link';
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckboxSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io"; 
import { IoIosHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { getSavedProducts, saveProduct, removeProduct } from "@/services/storageHelpers";
import { getCartItems, saveCartItem, removeCartItem } from "@/services/cartHelpers";

interface SubcategoryProductsProps {
    subcategoryData: {
      name: string;
      subcategory2: {
        name: string;
        products: {
          id: number;
          name: string;
        }[];
      }[];
    };
    subcategoryName: string;
  }
  

  const SubcategoryProducts: React.FC<SubcategoryProductsProps> = ({
    subcategoryData,
    subcategoryName,
  }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>(
    productData.reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {} as Record<number, number>)
  );

  const [quantities, setQuantities] = useState<Record<number, number>>(
    productData.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {} as Record<number, number>)
  );

  const handleImageChange = (productId: number, direction: 'prev' | 'next') => {
    const product = productData.find((p) => p.id === productId);
    if (!product || !product.imageThumbnails) return;

    setCurrentImageIndex((prev) => ({
      ...prev,
      [productId]:
        direction === 'prev'
          ? (prev[productId] - 1 + product.imageThumbnails.length) % product.imageThumbnails.length
          : (prev[productId] + 1) % product.imageThumbnails.length,
    }));
  };

  const increaseQuantity = (productId: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const decreaseQuantity = (productId: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] > 1 ? prevQuantities[productId] - 1 : 1,
    }));
  };

    // Состояние для выбранных производителей и цветов
    const [selectedManufacturers, setSelectedManufacturers] = useState<number[]>([]);
    const [selectedColors, setSelectedColors] = useState<number[]>([]);

    // Функция переключения состояния производителя
    const toggleManufacturer = (index: number) => {
    setSelectedManufacturers((prev) =>
        prev.includes(index) ? prev.filter((id) => id !== index) : [...prev, index]
    );
    };

    // Функция переключения состояния цвета
    const toggleColor = (index: number) => {
    setSelectedColors((prev) =>
        prev.includes(index) ? prev.filter((id) => id !== index) : [...prev, index]
    );
    };


    // Для сортировки и фильтрации
    const [sortBy, setSortBy] = useState<'price' | 'popularity' | 'rating'>('price');
    const [activeSort, setActiveSort] = useState<'price' | 'popularity' | 'rating'>('price');

    // Логика для сортировки
    const handleSortChange = (sortKey: 'price' | 'popularity' | 'rating') => {
        setActiveSort(sortKey);
        setSortBy(sortKey);
    };

    // Обновление productData перед рендером, но рендер остается неизменным
    const sortedProductData = [...productData].sort((a, b) => {
        if (sortBy === 'price') {
            return a.price - b.price;
        } else if (sortBy === 'popularity') {
            return b.salesCount - a.salesCount; // Сортировка по популярности
        } else if (sortBy === 'rating') {
            return b.rating - a.rating; // Сортировка по рейтингу
        }
        return 0;
    });


    
    // Фильтрация продуктов по выбранным производителям и цветам
    const filteredProductData = productData.filter((product) => {
        const matchesManufacturer =
            selectedManufacturers.length === 0 || // Если ничего не выбрано, показываем все
            selectedManufacturers.includes(manufacturers.indexOf(product.manufacturer));

        const matchesColor =
            selectedColors.length === 0 || // Если ничего не выбрано, показываем все
            product.availableColors.some((color) => selectedColors.includes(colors.indexOf(color)));

        return matchesManufacturer && matchesColor;
    });

    // Применение сортировки к отфильтрованным продуктам
    const sortedAndFilteredProductData = [...filteredProductData].sort((a, b) => {
        if (sortBy === 'price') {
            return a.price - b.price;
        } else if (sortBy === 'popularity') {
            return b.salesCount - a.salesCount; // Сортировка по популярности
        } else if (sortBy === 'rating') {
            return b.rating - a.rating; // Сортировка по рейтингу
        }
        return 0;
    });


    // Состояние для выбранной максимальной цены
    const [maxPrice, setMaxPrice] = useState(9999999);

    // Обработчик изменения значения бегунка
    const handlePriceChange = (value: number) => {
        setMaxPrice(value);
    };

    // Фильтрация продуктов по выбранной максимальной цене
    const filteredByPriceProductData = sortedAndFilteredProductData.filter((product) => {
        return product.price <= maxPrice;
    });


    const [likedProducts, setLikedProducts] = useState<Record<number, boolean>>({});
    const [savedProducts, setSavedProducts] = useState<any[]>([]);
    
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

    //добавление товаров в корзину
    const handleAddToCart = (product: any) => {
        saveCartItem(product);
        alert(`Товар "${product.name}" добавлен в корзину.`);
      };


    const [isManufacturerVisible, setIsManufacturerVisible] = useState(true);
    const [isColorsVisible, setIsColorsVisible] = useState(true);

    //переключение видимости списка производителей.
    const toggleManufacturerVisibility = () => {
        setIsManufacturerVisible((prev) => !prev);
    };

    //переключение видимости списка цветов.
    const toggleColorsVisibility = () => {
        setIsColorsVisible((prev) => !prev);
    };

  return (
    <section className="subcategory-products">
        <div className="subcategory-products__breadcrumb">
            <Link href="/">Главная</Link>
            {" / "}
            <Link href="/catalog">
                <span>Каталог</span>
            </Link>
            {" / "}
            <Link href="/category">
                <span>Категория</span>
            </Link>
            {" / "}
            <Link
                href={`/subcategory/${encodeURIComponent(subcategoryData.name)}`}
                className="subcategory__subcategory-link"
                >
                {subcategoryData.name}
                </Link>

        </div>

      {/*<h2 className="subcategory-products__title">Подкатегория</h2>*/}
      <h2 className="subcategory-products__title">{subcategoryName}</h2>

      <div className="subcategory-products__container">
        <div className="subcategory-products__left">            
            <div className="subcategory-products__price-range">
                <div className="subcategory-products__price-title">Цена, ₽</div>
                <div className="subcategory-products__price-inputs">
                    <div className="subcategory-products__price-min">от 110</div>
                    <div className="subcategory-products__price-divider">–</div>
                    <div className="subcategory-products__price-max">{maxPrice}</div>
                </div>
                <div className="subcategory-products__price-slider">
                    <input
                        type="range"
                        min="110"
                        max="5000"
                        value={maxPrice}
                        onChange={(e) => handlePriceChange(Number(e.target.value))}
                        className="subcategory-products__slider"
                    />
                </div>
            </div>

        
            <div className="subcategory-products__manufacturers">
                <div
                    className="subcategory-products__manufacturer-title"
                    onClick={toggleManufacturerVisibility}
                >
                    Производитель <IoIosArrowDown className={`icon-dropdown ${isManufacturerVisible ? 'rotated' : ''}`} />
                </div>
                {isManufacturerVisible && (
                    <div className="subcategory-products__manufacturer-list">
                        {manufacturers.map((manufacturer, index) => (
                            <div
                                key={index}
                                className="subcategory-products__manufacturer-item"
                                onClick={() => toggleManufacturer(index)}
                            >
                                {selectedManufacturers.includes(index) ? (
                                    <IoCheckboxSharp className="subcategory-products__icon-checked" />
                                ) : (
                                    <MdCheckBoxOutlineBlank className="subcategory-products__icon-unchecked" />
                                )}
                                {manufacturer}
                            </div>
                        ))}
                    </div>
                )}
            </div>


            <div className="subcategory-products__colors">
                <div
                    className="subcategory-products__colors-title"
                    onClick={toggleColorsVisibility}
                >
                    Цвет <IoIosArrowDown className={`icon-dropdown ${isColorsVisible ? 'rotated' : ''}`} />
                </div>
                {isColorsVisible && (
                    <div className="subcategory-products__color-list">
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                className="subcategory-products__color-item"
                                onClick={() => toggleColor(index)}
                            >
                                {selectedColors.includes(index) ? (
                                    <IoCheckboxSharp className="subcategory-products__icon-checked" />
                                ) : (
                                    <MdCheckBoxOutlineBlank className="subcategory-products__icon-unchecked" />
                                )}
                                {color}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        <div className="subcategory-products__wrapper">        
            <div className="subcategory-products__sort">
                    <p className="subcategory-products__sort-title">Сортировать:</p>
                    <div className="subcategory-products__sort-options">
                        <button
                            className={`subcategory-products__sort-price ${activeSort === 'price' ? 'active' : ''}`}
                            onClick={() => handleSortChange('price')}
                        >
                            по цене
                        </button>
                        <button
                            className={`subcategory-products__sort-popularity ${activeSort === 'popularity' ? 'active' : ''}`}
                            onClick={() => handleSortChange('popularity')}
                        >
                            по популярности
                        </button>
                        <button
                            className={`subcategory-products__sort-rating ${activeSort === 'rating' ? 'active' : ''}`}
                            onClick={() => handleSortChange('rating')}
                        >
                            по рейтингу
                        </button>
                    </div>
            </div>  

            <div className="subcategory-products__list">
            {filteredByPriceProductData.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                <div key={product.id} className="subcategory-products__item">
                    <div className="subcategory-products__image-wrapper">                        
                    <button
                        className="subcategory-products__image-button subcategory-products__image-button--prev"
                        onClick={(e) => {
                            e.preventDefault(); // Чтобы предотвратить переход при смене картинки
                            handleImageChange(product.id, 'prev');
                          }}
                    >
                        <MdKeyboardArrowLeft className="subcategory-products__icon--prev" />
                    </button>
                    <img
                        src={
                        product.imageThumbnails &&
                        product.imageThumbnails[currentImageIndex[product.id]] !== undefined
                            ? product.imageThumbnails[currentImageIndex[product.id]]
                            : "/placeholder-image.jpg"
                        }
                        alt={product.name}
                        className="subcategory-products__image"
                    />
                    <button
                        className="subcategory-products__image-button subcategory-products__image-button--next"
                        onClick={(e) => {
                            e.preventDefault(); // Чтобы предотвратить переход при смене картинки
                            handleImageChange(product.id, 'next');
                          }}
                    >
                        <MdKeyboardArrowRight className="subcategory-products__icon--next" />
                    </button>
                    </div> 
                    <button
                        className="subcategory-products__heart-button"
                        onClick={(e) => {
                            e.preventDefault(); // Чтобы предотвратить переход при лайке
                            toggleLike(product);
                          }}
                        >
                        {likedProducts[product.id] ? (
                            <IoHeart className="subcategory-products__heart-icon active" />
                        ) : (
                            <IoIosHeartEmpty className="subcategory-products__heart-icon" />
                        )}
                    </button>                


                    <p className="subcategory-products__name">{product.name}</p>
                    <p className="subcategory-products__article">Артикул: {product.article}</p>
                    <p className="subcategory-products__price">
                    {product.price} {product.currency}
                    </p>

                    <div className="subcategory-products-actions">

                    <button
                        className="subcategory-products-actions__add-to-cart"
                        onClick={(e) => {
                            e.preventDefault(); // Чтобы предотвратить переход при добавлении в корзину
                            handleAddToCart(product);
                          }}
                        >
                        В корзину
                    </button>

                    <div className="subcategory-products-actions__quantity">
                        <button
                        className="subcategory-products-actions__button"
                        onClick={(e) => {
                            e.preventDefault(); // Чтобы предотвратить переход при уменьшении количества
                            decreaseQuantity(product.id);
                          }}
                        >
                        -
                        </button>
                        <p className="subcategory-products-actions__value">{quantities[product.id]}</p>
                        <button
                        className="subcategory-products-actions__button"
                        onClick={(e) => {
                            e.preventDefault(); // Чтобы предотвратить переход при увеличении количества
                            increaseQuantity(product.id);
                          }}
                        >
                        +
                        </button>
                    </div>
                    </div>
                </div>
                </Link>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default SubcategoryProducts;
