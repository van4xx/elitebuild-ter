import React from 'react';
import Link from 'next/link';

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="about-us__breadcrumb">
        <Link href="/">
          Главная
        </Link>
        {" / "}
        <Link href="/AboutCompany">
          О компании
        </Link>
      </div>
      <h1 className="about-us__title">О компании</h1>
      <div className="about-us__columns">
        <div className="about-us__intro">
          <p>
            Мы — команда профессионалов, увлечённых созданием качественных цифровых решений. Наша цель — помогать клиентам добиваться успеха в цифровом мире, предлагая инновационные услуги и передовые технологии.
          </p>
        </div>
        <ol className="about-us__list">
          <li className="about-us__item">
            <strong>Опыт.</strong> Мы работаем в сфере веб-разработки и цифровых решений более 10 лет, создавая проекты любой сложности.
          </li>
          <li className="about-us__item">
            <strong>Индивидуальный подход.</strong> Мы учитываем все особенности и пожелания клиента, чтобы предлагать уникальные решения.
          </li>
          <li className="about-us__item">
            <strong>Технологии.</strong> Мы используем только проверенные и современные технологии, обеспечивая надёжность и эффективность наших решений.
          </li>
          <li className="about-us__item">
            <strong>Поддержка.</strong> Мы остаёмся на связи с клиентами даже после завершения проекта, предлагая техническую поддержку и обновления.
          </li>
        </ol>
        <div className="about-us__note">
          <p>
            Наша компания гордится своими достижениями и благодарна клиентам за доверие. Мы ценим каждый проект и всегда стремимся к идеалу.
          </p>
          <p>
            Свяжитесь с нами, чтобы обсудить ваши задачи, и мы поможем воплотить ваши идеи в жизнь!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
