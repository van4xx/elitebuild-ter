import React, { useState } from 'react';
import Navbar from '@/src/Sections/Navbar/Navbar';
import CitySelector from '../src/Components/CitySelector/CitySelector';
import Footer from '../src/Sections/Footer/Footer';

const City = () => {
  const [selectedCity, setSelectedCity] = useState("Выбрать город");

  const handleCitySelect = (city: string) => {
    setSelectedCity(city); 
    console.log(`Выбран город: ${city}`); 
  };

  return (
    <>
      <Navbar />
      <CitySelector onCitySelect={handleCitySelect} />
    
    </>
  );
};

export default City;

/*
http://localhost:3000/City
*/
