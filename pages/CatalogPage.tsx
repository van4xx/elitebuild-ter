import React from 'react';
import Navbar from '@/src/Sections/Navbar/Navbar';
import CatalogComponent from '../src/Sections/CatalogComponent/CatalogComponent';
import Footer from '../src/Sections/Footer/Footer';

const CatalogPage = () => {
  return (
    <>
      <Navbar />
      <CatalogComponent />
      <Footer />
    </>
  );
};

export default CatalogPage;

/*
http://localhost:3000/CatalogPage
*/
