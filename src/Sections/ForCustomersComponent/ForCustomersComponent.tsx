import React from 'react';
import Link from 'next/link';

const ForCustomersComponent = () => {
  return (
    <section className="for-customers">
      <div className="for-customers__breadcrumb">
        <Link href="/">
          Главная
        </Link>
        {" / "}
        <Link href="/ForCustomers">
          Покупателям
        </Link>
      </div>
      <h1 className="for-customers__title">Покупателям</h1>
      <div className="for-customers__columns">
        <div className="for-customers__intro">
          <p>
            Мы стремимся обеспечить комфорт и прозрачность на каждом этапе вашего взаимодействия с нами. Наши клиенты получают доступ к лучшему сервису и полной поддержке.
          </p>
        </div>
        <ol className="for-customers__list">
          <li className="for-customers__item">
            <strong>Простая регистрация.</strong> Создайте аккаунт всего за несколько шагов и получите доступ к персонализированным предложениям.
          </li>
          <li className="for-customers__item">
            <strong>Удобный поиск и фильтры.</strong> Мы сделали навигацию по нашему каталогу максимально удобной, чтобы вы могли быстро находить то, что вам нужно.
          </li>
          <li className="for-customers__item">
            <strong>Гарантия качества.</strong> Все наши товары проходят строгую проверку, чтобы соответствовать вашим ожиданиям.
          </li>
          <li className="for-customers__item">
            <strong>Служба поддержки.</strong> Если у вас возникнут вопросы, наша команда всегда готова помочь вам в кратчайшие сроки.
          </li>
        </ol>
        <div className="for-customers__note">
          <p>
            Мы ценим ваше время и доверие. Наша цель — сделать ваш опыт максимально приятным и удобным.
          </p>
          <p>
            Если у вас есть предложения или замечания, мы будем рады получить вашу обратную связь. Она помогает нам становиться лучше для вас.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForCustomersComponent;
