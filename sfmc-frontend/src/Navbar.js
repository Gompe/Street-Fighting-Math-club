import React from 'react'
import { Link } from 'react-router-dom'
import useAuthentication from './utils/useAuthentication'

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container w-80'>
        <a href='#' className='navbar-brand'>
          SFMC-BX
        </a>

        <Link className='nav-link text-white' to='/'>
          Home
        </Link>
        <Link className='nav-link text-white' to='/contests'>
          Contests
        </Link>

        <Link className='nav-link text-white' to='/login'>
          Login
        </Link>

        <Link className='nav-link text-white' to='/admin'>
          Admin
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
