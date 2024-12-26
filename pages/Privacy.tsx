import React from 'react'
import Navbar from '@/src/Sections/Navbar/Navbar'
import PrivacyPolicy from '@/src/Sections/PrivacyPolicy/PrivacyPolicy'
import Footer from '../src/Sections/Footer/Footer'

const Privacy = () => {
  return (
    <>
      <Navbar/>
      <PrivacyPolicy />              
      <Footer />    
    </>
  )
}

export default Privacy

/*
http://localhost:3000/Privacy
*/