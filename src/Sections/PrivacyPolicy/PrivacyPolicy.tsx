import React from 'react';
import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <section className="privacy-policy">
      <div className="privacy-policy__breadcrumb">
        <Link href="/">
          Главная
        </Link>
        {" / "}
        <Link href="/Privacy">
          Политика конфиденциальности
        </Link>
      </div>
      <h1 className="privacy-policy__title">Политика конфиденциальности</h1>
      <div className="privacy-policy__content">
        <div className="privacy-policy__intro">
          <p>
            Мы уважаем вашу конфиденциальность и обязуемся защищать ваши персональные данные. Настоящая политика конфиденциальности объясняет, как мы собираем, используем и храним ваши данные.
          </p>
        </div>
        <h2 className="privacy-policy__subtitle">Сбор данных</h2>
        <ol className="privacy-policy__list">
          <li className="privacy-policy__item">
            <strong>Персональная информация.</strong> Мы можем собирать ваши имя, адрес электронной почты, номер телефона и другую информацию, которую вы предоставляете при заполнении форм на нашем сайте.
          </li>
          <li className="privacy-policy__item">
            <strong>Автоматически собираемые данные.</strong> При посещении нашего сайта мы автоматически собираем техническую информацию, такую как IP-адрес, тип устройства, браузер и данные о вашем взаимодействии с сайтом.
          </li>
        </ol>
        <h2 className="privacy-policy__subtitle">Использование данных</h2>
        <ol className="privacy-policy__list">
          <li className="privacy-policy__item">
            <strong>Для предоставления услуг.</strong> Мы используем ваши данные для обработки заказов, ответа на запросы и предоставления поддержки.
          </li>
          <li className="privacy-policy__item">
            <strong>Для улучшения сайта.</strong> Мы анализируем собранные данные для улучшения функциональности и контента сайта.
          </li>
          <li className="privacy-policy__item">
            <strong>Для маркетинговых целей.</strong> С вашего согласия мы можем использовать ваши данные для отправки промоакций и новостей.
          </li>
        </ol>
        <h2 className="privacy-policy__subtitle">Защита данных</h2>
        <div className="privacy-policy__note">
          <p>
            Мы принимаем все разумные меры для защиты ваших данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
          </p>
        </div>
        <h2 className="privacy-policy__subtitle">Передача данных</h2>
        <ol className="privacy-policy__list">
          <li className="privacy-policy__item">
            <strong>Третьим лицам.</strong> Мы не передаем ваши персональные данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством.
          </li>
          <li className="privacy-policy__item">
            <strong>Международная передача.</strong> Если ваши данные передаются за пределы вашей страны, мы обеспечиваем их защиту в соответствии с действующими нормами.
          </li>
        </ol>
        <h2 className="privacy-policy__subtitle">Ваши права</h2>
        <div className="privacy-policy__note">
          <p>
            Вы имеете право запросить доступ к своим данным, их исправление, удаление, а также ограничение обработки. Для этого свяжитесь с нами по указанным контактам.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
