import React from 'react'
import { Fragment } from 'react'
import './header.css'
import logo from '../../images/Book Tounsi.png'
import Search from './Search.js'
import {Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {Cart} from '../cart/Cart.js'
import { useSelector } from 'react-redux'

const linkStyle = {
  textDecoration: "none",
  color: 'black'
};

const Header = () => {
  const { cartItems } = useSelector(state => state.cart)

  return (
<Fragment id="header">
<nav id="navbar">
        <img src={logo} alt='logo' style={{height: 100}}/>
      
    <div className="col-12 col-md-6 mt-2 mt-md-0">
    <Search />
    
    </div>
    <Link to="/cart" style={{ textDecoration: 'none' }} >
                        <span id="cart" className="ml-3" >Cart</span>
                        <span className="ml-1" id="cart_count">{cartItems.length}</span>
                    </Link>
    <ul>
      <li><a ><Link to="/AboutUs"  style={linkStyle}>ABOUT US</Link></a> </li>
      <li><a><Link to="/ContactUs"  style={linkStyle}>CONTACT US</Link></a> </li>

    </ul>
    <Link to="/login" style={linkStyle} >Login</Link>



   
  </nav>
  </Fragment>  )
}

export default Header