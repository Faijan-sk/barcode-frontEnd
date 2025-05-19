import React from 'react'
import NavBar from './../../components/navBar/NavBar2'
import Footer from './../../components/footer/Footer'
import HomePage from '../../components/sendTopUp/Send-top-up-two'

function page() {
  return (
    <>
      {/* NavBar Section Here  */}
      <NavBar />

      <HomePage />

      {/* Footer Section Here  */}
      <Footer />
    </>
  )
}

export default page
