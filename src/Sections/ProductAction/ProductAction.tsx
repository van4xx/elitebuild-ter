import React, { useState } from "react";

const ProductAction: React.FC = () => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore((prevState) => !prevState);
  };

  return (
    <section id="product-action">
      <div className="product-action__content">
        <div className="product-action__block product-action__block--1"></div>
        <div className="product-action__block product-action__block--2"></div>
        <div className="product-action__block product-action__block--3"></div>
        <div className="product-action__block product-action__block--4"></div>

        {showMore && (
          <>
            <div className="product-action__block product-action__block--5"></div>
            <div className="product-action__block product-action__block--6"></div>
            <div className="product-action__block product-action__block--7"></div>
            <div className="product-action__block product-action__block--8"></div>
          </>
        )}
      </div>

      <div className="product-action__show-all">
        <button className="product-action__show-all-button" onClick={handleShowMore}>
          {showMore ? "Скрыть" : "Показать все"}
        </button>
      </div>
    </section>
  );
};

export default ProductAction;

