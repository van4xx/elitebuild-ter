import React, { useState } from 'react';
import { catalogData } from '@/src/source';
import Link from 'next/link';
import { FaArrowRightLong } from "react-icons/fa6";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";


const CatalogComponent: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [expandedProducts, setExpandedProducts] = useState<Record<string, boolean>>({});

  const toggleProducts = (key: string) => {
    setExpandedProducts((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className="catalog">
      <div className="catalog__left">
        {catalogData.map((categoryData, index) => (
          <div
            key={index}
            className={`catalog__category ${
              activeCategoryIndex === index ? 'active' : ''
            }`}
            onClick={() => setActiveCategoryIndex(index)}
          >
            {categoryData.category}
          </div>
        ))}
      </div>
      <div className="catalog__right">
      <div className="catalog__category-container">
        <Link
          href={`/category/${encodeURIComponent(catalogData[activeCategoryIndex].category)}`}
          className="catalog__category-link"
        >
          <h3 className="catalog__category-title">
            {catalogData[activeCategoryIndex].category}
          </h3>
        </Link>
        <Link
          href={`/category/${encodeURIComponent(catalogData[activeCategoryIndex].category)}`}
          className="catalog__category-arrow-link"
        >
          <FaArrowRightLong />
        </Link>
      </div>

        <div className="catalog__subcategory-container">
          {catalogData[activeCategoryIndex].subcategories.map((subcategory, subIndex) => (
            <div key={subIndex} className="catalog__subcategory">
              <h4 className="catalog__subcategory-title">
              <Link
                href={`/subcategory/${encodeURIComponent(subcategory.name)}`}
                className="catalog__subcategory-link"
              >
                {subcategory.name}
              </Link>


              </h4>
              {subcategory.subcategory2.map((sub2, sub2Index) => {
                const key = `${subIndex}-${sub2Index}`; 
                const isExpanded = expandedProducts[key] || false;
                const productsToShow = isExpanded
                  ? sub2.products
                  : sub2.products.slice(0, 5); // Показываем максимум 5 товаров.

                return (
                  <div key={sub2Index} className="catalog__subcategory2">
                    <h5 className="catalog__subcategory2-title">{sub2.name}</h5>
                    <ul className="catalog__product-list">
                      {productsToShow.map((product) => (
                        <li key={product.id} className="catalog__product-item">
                          <Link href={`/product/${product.id}`}>{product.name}</Link>
                        </li>
                      ))}
                    </ul>
                    {sub2.products.length > 5 && (
                      <button
                      className="catalog__toggle-button"
                      onClick={() => toggleProducts(key)}
                    >
                      {isExpanded ? (
                        <>
                          Свернуть <FaChevronUp />
                        </>
                      ) : (
                        <>
                          Ещё <FaChevronDown />
                        </>
                      )}
                    </button>
                    
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogComponent;



