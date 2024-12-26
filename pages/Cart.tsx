import React from 'react'
import Navbar from '@/src/Sections/Navbar/Navbar'
import CartComponent from '../src/Sections/CartComponent/CartComponent'
import Footer from '../src/Sections/Footer/Footer'

const Cart = () => {
  return (
    <>
      <Navbar/>
      <CartComponent  />    
      <Footer />    
    </>
  )
}

export default Cart

/*
http://localhost:3000/Cart
*/