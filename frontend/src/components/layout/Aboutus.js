import React from 'react'
import './aboutus.css'
import logo from './Book Tounsi.png'
function Aboutus() {
  return (
    <div className='aboutus' >
    <h1 className='welcometo'>WELCOME TO </h1>
    <div className="imgpg">
    <img src={logo} ></img>
    <p >Book Tounsi is a Tunisian web application that allows you to buy your favorite books from Tunisian authors. It offers you a huge collection including a multitude of books that you can buy at low prices and in a jiffy.</p>
         </div>

    </div>
    
    
  )
}

export default Aboutus