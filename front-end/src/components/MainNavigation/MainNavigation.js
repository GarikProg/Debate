import React from 'react';
import {Link} from 'react-router-dom'
import "./MainNavigation.scss"


function MainNavigation() {
  return (
    <>
    <div className="navBar">
     <Link to="/LocalThread">Local Thread </Link>
     <Link to="/GlobalThread">Global Thread </Link>
     </div>
    </>
  )
}

export default MainNavigation
