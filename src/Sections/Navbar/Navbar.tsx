import React, { useState, useEffect, useRef } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import Link from 'next/link';
import CatalogComponent from '../CatalogComponent/CatalogComponent';
import { useRouter } from "next/router";
import CitySelector from "@/src/Components/CitySelector/CitySelector";
import ServicesDropdown from "@/src/Components/ServicesDropdown/ServicesDropdown";
import LeaveRequestForm from "@/src/Components/LeaveRequestForm/LeaveRequestForm2";

const Navbar = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const catalogRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleCatalog = () => {
    setIsCatalogOpen((prev) => !prev);
  };
  const closeLeaveRequestForm = () => {
    setIsLeaveRequestFormOpen(false);
  };
  
  //поиск
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/Subcategory3?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        catalogRef.current &&
        !catalogRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsCatalogOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

 
  // Выбор города
  const [isCitySelectorOpen, setIsCitySelectorOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Выбрать город");

  const citySelectorRef = useRef<HTMLDivElement>(null);

  const toggleCitySelector = () => {
    setIsCitySelectorOpen((prev) => !prev);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsCitySelectorOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        citySelectorRef.current &&
        !citySelectorRef.current.contains(event.target as Node)
      ) {
        setIsCitySelectorOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //меню сервисов
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //отправить заявку 
  const [isLeaveRequestFormOpen, setIsLeaveRequestFormOpen] = useState(false);

  const toggleLeaveRequestForm = () => {
    setIsLeaveRequestFormOpen((prev) => !prev);
  };
  // Добавляем ссылку на форму заявки
const leaveRequestFormRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      leaveRequestFormRef.current &&
      !leaveRequestFormRef.current.contains(event.target as Node)
    ) {
      setIsLeaveRequestFormOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (
    <div className="navbar">       
        <div className="navbar-middle__logo-mobile">
          <Link href="/">
          <img src="/images/logo.png" alt="Логотип ПрестижСтрой" />
          </Link>
        </div>      

      {/* Верхний блок */}
      <div className="navbar-top">
        
      <div className="navbar-top__location" onClick={toggleCitySelector}>
          <CiLocationOn className="icon-location" />
          {selectedCity}
          <IoMdArrowDropdown className="icon-dropdown" />
        </div>
        {isCitySelectorOpen && (
          <div
            className="navbar-top__city-selector"
            ref={citySelectorRef}
          >
            <CitySelector onCitySelect={handleCitySelect} />
          </div>
        )}

        <div className="navbar-top__phone">+7 (900) 999-99-99</div>
        <button className="navbar-top__request" onClick={toggleLeaveRequestForm}>
          <p className="navbar-top__request-text">Оставить заявку</p>
        </button>
        {isLeaveRequestFormOpen && (
  <>
    <div
      className="modal-overlay"
      onClick={() => setIsLeaveRequestFormOpen(false)} // Закрытие при клике по затемнению
    ></div>
    <div
      className="navbar-leave-request-form"
      ref={leaveRequestFormRef}
    >
      <LeaveRequestForm />
    </div>
  </>
)}

      </div>

      {/* Средний блок */}
      <div className="navbar-middle">
        <div className="navbar-middle__logo">
          <Link href="/">
            <img src="/images/logo.png" alt="Логотип ПрестижСтрой" />
          </Link>
        </div>
        <div className="navbar-middle__catalog" ref={catalogRef}>
          <button
            ref={buttonRef}
            onClick={toggleCatalog}
            className="navbar-middle__catalog-button"
          >
            <MdMenu className="icon-menu" />
            <p className="navbar-middle__catalog-text">Каталог</p>
          </button>
          {isCatalogOpen && (
            <div className="navbar-middle__catalog-dropdown">
              <CatalogComponent />
            </div>
          )}
        </div>
        
        <div className="navbar-middle__search">
          <div className="navbar-middle__search-input-wrapper">
            <input
              type="text"
              placeholder="Поиск по товарам"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="navbar-middle__search-button-wrapper">
            <button
              className="navbar-middle__search-button"
              onClick={handleSearch}
            >
              <IoSearchSharp className="navbar-middle__search-icon" />
            </button>
          </div>
        </div>

        <nav className="navbar-middle__icons">
        <div className="navbar-middle__service-wrapper" ref={servicesDropdownRef}>
          <button className="navbar-middle__service" onClick={toggleServicesDropdown}>
            <div className="navbar-middle__icon-wrapper">
              <img src="/images/сервисы.svg" alt="Сервисы" className="navbar-middle__icon" />
              <p className="navbar-middle__icon-text">Сервисы</p>
            </div>
          </button>
          {isServicesDropdownOpen && (
            <div className="navbar-middle__services-dropdown">
              <ServicesDropdown />
            </div>
          )}
        </div>


          <Link href="/Comparison">
          <button className="navbar-middle__comparison">
            <div className="navbar-middle__icon-wrapper">
              <img src="/images/сравнение.svg" alt="Сравнение" className="navbar-middle__icon" />
              <p className="navbar-middle__icon-text">Сравнение</p>
            </div>
          </button>
          </Link>

          <Link href="/Favorites">          
          <button className="navbar-middle__favorites">
            <div className="navbar-middle__icon-wrapper">
              <img src="/images/отложенные.svg" alt="Отложенные" className="navbar-middle__icon" />
              <p className="navbar-middle__icon-text">Отложенные</p>
            </div>
          </button>
          </Link>

          <Link href="/Cart">
          <button className="navbar-middle__cart">
            <div className="navbar-middle__icon-wrapper">
              <img src="/images/корзина.svg" alt="Корзина" className="navbar-middle__icon" />
              <p className="navbar-middle__icon-text">Корзина</p>
            </div>
          </button>
          </Link>

        </nav>

      </div>

      {/* Нижний блок */}
      <nav className="navbar-bottom">
      <Link href="/AboutCompany/" className="navbar-link">О компании</Link>
      <Link href="/ForCustomers/" className="navbar-link">Для клиентов</Link>
      <Link href="/Contacts/" className="navbar-link">Контакты</Link>
      </nav>
    
      <div className="navbar-line"></div>
     
    </div>
  );
};

export default Navbar;