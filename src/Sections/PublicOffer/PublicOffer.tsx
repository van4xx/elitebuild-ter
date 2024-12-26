import React from 'react';
import Link from 'next/link';

const PublicOffer = () => {
  return (
    <section className="public-offer">
      <div className="public-offer__breadcrumb">
        <Link href="/">
          Главная
        </Link>
        {" / "}
        <Link href="/PublicOffer">
          Договор публичной оферты
        </Link>
      </div>
      <h1 className="public-offer__title">Договор публичной оферты</h1>
      <div className="public-offer__content">
        <div className="public-offer__intro">
          <p>
            Настоящий договор является публичной офертой, определяющей условия предоставления товаров и услуг. Использование сайта означает принятие данных условий.
          </p>
        </div>
        <h2 className="public-offer__subtitle">Общие положения</h2>
        <ol className="public-offer__list">
          <li className="public-offer__item">
            <strong>Предмет договора.</strong> Продавец обязуется предоставить товары/услуги, а покупатель обязуется оплатить их на условиях, указанных в данном договоре.
          </li>
          <li className="public-offer__item">
            <strong>Акцепт оферты.</strong> Акцепт настоящего договора осуществляется путем оформления заказа и/или оплаты товара/услуги.
          </li>
        </ol>
        <h2 className="public-offer__subtitle">Обязательства сторон</h2>
        <ol className="public-offer__list">
          <li className="public-offer__item">
            <strong>Обязанности продавца.</strong> Предоставить товары/услуги надлежащего качества в соответствии с условиями настоящего договора.
          </li>
          <li className="public-offer__item">
            <strong>Обязанности покупателя.</strong> Своевременно оплатить заказ и предоставить необходимую информацию для выполнения обязательств продавцом.
          </li>
        </ol>
        <h2 className="public-offer__subtitle">Условия оплаты</h2>
        <div className="public-offer__note">
          <p>
            Оплата товаров/услуг производится в соответствии с условиями, указанными на сайте. После оплаты покупателю предоставляется подтверждение заказа.
          </p>
        </div>
        <h2 className="public-offer__subtitle">Возврат и обмен</h2>
        <ol className="public-offer__list">
          <li className="public-offer__item">
            <strong>Условия возврата.</strong> Покупатель имеет право на возврат товара/услуги в случае обнаружения дефектов или несоответствия описанию.
          </li>
          <li className="public-offer__item">
            <strong>Процедура возврата.</strong> Для возврата товара покупатель должен связаться с продавцом и следовать указанной процедуре.
          </li>
        </ol>
        <h2 className="public-offer__subtitle">Заключительные положения</h2>
        <div className="public-offer__note">
          <p>
            Настоящий договор вступает в силу с момента акцепта оферты и действует до полного выполнения обязательств сторонами.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PublicOffer;
