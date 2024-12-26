import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/src/Sections/Navbar/Navbar';
import SubcategoryProducts4 from '@/src/Sections/SubcategoryProducts4/SubcategoryProducts4';
import Footer from '@/src/Sections/Footer/Footer';
import { catalogData } from '@/src/source';

const CategoryPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const category = catalogData.find(
    (cat) => cat.category.toLowerCase() === String(id).toLowerCase()
  );

  if (!category) {
    return <p>Категория не найдена</p>;
  }

  return (
    <>
      <Navbar />
      <SubcategoryProducts4 
        categoryData={category} 
        categoryName={category.category} 
       />
      <Footer />
    </>
  );
};

export default CategoryPage;


/*
http://localhost:3000/Category
*/