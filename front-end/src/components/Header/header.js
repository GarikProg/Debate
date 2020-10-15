import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./header.scss"

function Header() {
  const isAuthenticated = useSelector(state => state.isAuthenticated)

  return (
    <>
    <div className="header">
      <span>
      <Link to="/MainPage">Main Page </Link>
      </span>
      <span>
      <Link to="/Profile">Profile </Link>
      </span>
      <span>
      <Link to="/About">About </Link>
      </span>
      <span>
      <Link to="/Registration">Registation </Link>
      </span>
      <span>
      {!isAuthenticated && <Link to="/Login">Login </Link>}
      {isAuthenticated && <Link to="/Logout">Logout </Link>}
      </span>
    </div>
    </>
  )
}

export default Header
