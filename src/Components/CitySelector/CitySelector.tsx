import React, { useState, useRef, useEffect } from "react";
import { cities } from "@/src/source";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

interface CitySelectorProps {
  onCitySelect: (city: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ onCitySelect }) => {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(true);
  const [selectedCity, setSelectedCity] = useState("Выбрать город");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCitySelect = (city: string) => {
    onCitySelect(city); 
    setSelectedCity(city); 
    setIsCityDropdownOpen(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCityDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="city-selector">
      <div className="city-selector__header" onClick={() => setIsCityDropdownOpen(true)}>
        <span className="city-selector__selected">{selectedCity}</span>
        <IoMdArrowDropdown className="city-selector__icon" />
      </div>
      {isCityDropdownOpen && (
        <div className="city-selector__dropdown" ref={dropdownRef}>
          <div className="city-selector__search">
            <input
              type="text"
              placeholder="Ваш город"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="city-selector__search-input"
            />
            <IoMdClose
              className="city-selector__close-icon"
              onClick={() => setSearchTerm("")}
            />
          </div>
          <ul className="city-selector__list">
            {filteredCities.map((city, index) => (
              <li
                key={index}
                className="city-selector__item"
                onClick={() => handleCitySelect(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CitySelector;

