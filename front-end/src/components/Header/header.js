import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./header.scss";

function Header() {

  const isAuthorized = useSelector(state => state.isAuthorized);

  return (
    <>
    <div className="header">
      <button className="mainPageStyle">
      <Link className="mainLinkStyle" to="/Home">
      <h1 className="neon" data-text="U">DE<span className="flicker-slow">B</span>A<span className="flicker-fast">T</span>ES</h1></Link>
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
      <span>
      {!isAuthorized && <Link to="/createThread">Create Thread </Link>}      
      </span>
    </div>
    </>
  )
}

export default Header
