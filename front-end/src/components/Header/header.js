import React from 'react';
import { Link } from 'react-router-dom';
import "./header.scss";

function Header() {
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
    </div>
    </>
  )
}

export default Header
