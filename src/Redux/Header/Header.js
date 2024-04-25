import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header_div'>
      <div className='header_text_1'>
        <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
          <div className='header_ecom'>E-Com</div>
        </Link>
      </div>
      <div className='header_text_2'>
        Product
      </div>
    </div>
  )
}

export default Header