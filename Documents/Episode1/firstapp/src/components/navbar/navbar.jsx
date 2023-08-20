import React from 'react'
import './Nav.css'


function Navbar() {
  return (
    <nav className='appNav'>
        <ul className='navLinks'>
            <li className='LinkA'><a href='home'>Home</a></li>
            <li className='LinkA'><a href='transactions'>Transactions</a></li>
        </ul>
    </nav>
  )
}

export default Navbar