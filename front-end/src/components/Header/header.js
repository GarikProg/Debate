import React from 'react';
import { Link } from 'react-router-dom';
import "./header.scss"

function Header() {
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
      <Link to="/Login">Login </Link>
      </span>
    </div>
    </>
  )
}

export default Header
