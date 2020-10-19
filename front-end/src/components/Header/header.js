import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./header.scss"

function Header() {

  const isAuthorized = useSelector(state => state.isAuthorized);

  return (
    <>
    <div className="header">
      <button className="mainPageStyle">
      <Link className="mainLinkStyle" to="/MainPage">Main Page </Link>
      </button>
      <button className="profileStyle">
      <Link className="profileLinkStyle" to="/Profile">Profile </Link>
      </button>
      <button className="aboutStyle">
      <Link className="aboutLinkStyle" to="/About">About </Link>
      </button>
      <button className="registrationStyle">
      <Link className="regLinkStyle" to="/Registration">Registration </Link>
      </button>
      <span>
      {!isAuthorized && <Link to="/Login">Login </Link>}
      {isAuthorized && <Link to="/Logout">Logout </Link>}
      </span>
    </div>
    </>
  )
}

export default Header
