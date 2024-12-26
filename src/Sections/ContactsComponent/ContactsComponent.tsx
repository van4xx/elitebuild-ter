import React from 'react';
import Link from 'next/link';

const ContactsComponent = () => {
  return (
    <section className="contacts">
      <div className="contacts__breadcrumb">
        <Link href="/">
          Главная
        </Link>
        {" / "}
        <Link href="/Contacts">
          Контакты
        </Link>
      </div>
      <h1 className="contacts__title">Контактная информация</h1>
      <div className="contacts__columns">
        <div className="contacts__intro">
          <p>
            Ниже вы найдете всю необходимую информацию для связи с нашей компанией, включая адреса, телефоны и электронную почту.
          </p>
        </div>
        <ul className="contacts__list">
          <li className="contacts__item">
            <strong>Адрес для почтовой корреспонденции:</strong>  
            БОКС № 5678, Москва, 101000
          </li>
          <li className="contacts__item">
            <strong>Адрес для приема корреспонденции, направляемой нарочным:</strong>  
            Примерная улица, д. 2Б, стр. 1, Москва
          </li>
          <li className="contacts__item">
            <strong>Адрес местонахождения:</strong>  
            Проспект Победы, д. 5, корп. 4, Москва, 125252
          </li>
          <li className="contacts__item">
            <strong>Телефон:</strong>  
            +7 (999) 999-999 (справочный)   
            +7 (999) 999-999 (факс)
          </li>
          <li className="contacts__item">
            <strong>Электронная почта:</strong>  
            info@prestijstroy.ru
            support@prestijstroy.ru (для замечаний по работе сайта)
          </li>
          <li className="contacts__item">
            <strong>Наименование компании:</strong>  
            полное — Общество с ограниченной ответственностью «Престижстрой»  
            сокращенное — ООО «Престижстрой»
          </li>
          <li className="contacts__item">
            <strong>Регистрационная информация:</strong>
            <p>Свидетельство о государственной регистрации № 987654321</p>
            <p>Основной государственный регистрационный номер (ОГРН) — 1037700123456</p>
            <p>Идентификационный номер налогоплательщика (ИНН) — 7701234567</p>
            <p>Код причины постановки на учет (КПП) — 773401001</p>
          </li>
        </ul>
        <div className="contacts__note">
          <p>
            Если у вас возникли дополнительные вопросы или предложения, пожалуйста, свяжитесь с нами. Мы всегда готовы помочь!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactsComponent;
