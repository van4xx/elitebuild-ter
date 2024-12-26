import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/src/Sections/Navbar/Navbar';
import SubcategoryProducts from '@/src/Sections/SubcategoryProducts/SubcategoryProducts';
import Footer from '@/src/Sections/Footer/Footer';
import { catalogData } from '@/src/source';

const SubcategoryPage = () => {
  const router = useRouter();
  const { id } = router.query; // Получаем параметр подкатегории

  if (!id) {
    return <p>Загрузка...</p>; // Показываем индикатор загрузки
  }

  // Ищем подкатегорию по id
  const subcategory = catalogData
    .flatMap((category) => category.subcategories) // Берём все подкатегории из всех категорий
    .find((sub) => sub.name.toLowerCase() === String(id).toLowerCase());

  if (!subcategory) {
    return <p>Подкатегория не найдена</p>; // Ошибка, если подкатегория не найдена
  }

  return (
    <>
      <Navbar />
      <SubcategoryProducts
        subcategoryData={subcategory} // Данные подкатегории передаются в компонент
        subcategoryName={subcategory.name} // Название подкатегории
      />
      <Footer />
    </>
  );
};

export default SubcategoryPage;






/*
http://localhost:3000/Subcategory
*/