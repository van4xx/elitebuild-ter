import React from 'react';
import Navbar from '@/src/Sections/Navbar/Navbar';
import ProductInfo from '@/src/Sections/ProductInfo/ProductInfo';
import RelatedProducts from '@/src/Sections/RelatedProducts/RelatedProducts';
import PopularProducts from '@/src/Sections/PopularProducts/PopularProducts';
import ProductAccessories from '@/src/Sections/ProductAccessories/ProductAccessories';
import Footer from '@/src/Sections/Footer/Footer';
import { useRouter } from 'next/router';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const productId = id ? String(id) : undefined;

  return (
    <>
      <Navbar />
      <ProductInfo productId={productId} />
      <RelatedProducts />
      <PopularProducts />
      <ProductAccessories />
      <Footer />
    </>
  );
};

export default ProductPage;



