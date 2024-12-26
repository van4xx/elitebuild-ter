import React from "react";
import Link from 'next/link';
import { catalogData } from '@/src/source';

const Header: React.FC = () => {
  return (
    <section id="header">
      <div className="header__content">       
        <div className="header__block">
            <div className="header__block-content">
                <p className="header__block-title">Стройматериалы</p>
                <Link
                    href={`/category/${encodeURIComponent("Стройматериалы")}`}
                    className="header__block-button"
                    >
                    Товары
                </Link>
            </div>
            <div className="header__block-image">
                <img src="/images/стройматериалы 2.png" alt="Стройматериалы" />
            </div>
        </div>
        <div className="header__block">
            <div className="header__block-content">
                <p className="header__block-title">Инструменты</p>
                <Link
                    href={`/category/${encodeURIComponent("Инструменты")}`}
                    className="header__block-button"
                    >
                    Товары
                </Link>
            </div>
            <div className="header__block-image">
                <img src="/images/инструменты 1.png" alt="Инструменты" />
            </div>
        </div>
        <div className="header__block">
            <div className="header__block-content">
                <p className="header__block-title">Электрика</p>
                <Link
                    href={`/category/${encodeURIComponent("Электрика")}`}
                    className="header__block-button"
                    >
                    Товары
                </Link>
            </div>
            <div className="header__block-image">
                <img src="/images/Электрика- 1.png" alt="Электрика" />
            </div>
        </div>
       
        <div className="header__block">
            <div className="header__block-content">
                <p className="header__block-title">Хозяйственный инвентарь</p>
                <Link
                    href={`/category/${encodeURIComponent("Инструменты")}`}
                    className="header__block-button"
                    >
                    Товары
                </Link>
            </div>
            <div className="header__block-image">
                <img src="/images/хоз инвентарь.png" alt="Хозяйственный инвентарь" />
            </div>
        </div>
      </div>

      <div className="header__show-all">
        <button className="header__show-all-button">Показать все</button>
      </div>
          
      <div className="header__info">
        <div className="header__info-item">
            <div className="header__info-icon">
            <img className="header__info-img" src="/images/Доставка.png" alt="Иконка быстрой доставки" />
            </div>
            <p className="header__info-title">Быстрая доставка</p>
        </div>
        <div className="header__info-item">
            <div className="header__info-icon">
            <img className="header__info-img" src="/images/ISO.png" alt="Иконка управления качеством" />
            </div>
            <p className="header__info-title">Многоуровневая система управления качеством по стандарту ISO 9001</p>
        </div>
        <div className="header__info-item">
            <div className="header__info-icon">
            <img className="header__info-img" src="/images/ассортимент.png" alt="Иконка большого ассортимента" />
            </div>
            <p className="header__info-title">Большой ассортимент</p>
        </div>
      </div>
    </section>
  );
};

export default Header;
