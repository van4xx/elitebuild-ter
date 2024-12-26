import React from 'react'
import Navbar from '@/src/Sections/Navbar/Navbar'
import ContactsComponent from '@/src/Sections/ContactsComponent/ContactsComponent'
import Footer from '../src/Sections/Footer/Footer'

const Contacts = () => {
  return (
    <>
      <Navbar/>
      <ContactsComponent />                      
      <Footer />    
    </>
  )
}

export default Contacts

/*
http://localhost:3000/Contacts
*/