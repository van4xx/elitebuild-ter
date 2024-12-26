import React from 'react'
import Navbar from '@/src/Sections/Navbar/Navbar'
import ForCustomersComponent from '@/src/Sections/ForCustomersComponent/ForCustomersComponent'
import Footer from '../src/Sections/Footer/Footer'

const ForCustomers = () => {
  return (
    <>
      <Navbar/>
      <ForCustomersComponent />                    
      <Footer />    
    </>
  )
}

export default ForCustomers

/*
http://localhost:3000/ForCustomers
*/