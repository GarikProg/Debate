import React from 'react';
import {Link} from 'react-router-dom'

function MainNavigation() {
  return (
    <>
     <Link to="/LocalThread">Local Thread </Link>
     <Link to="/GlobalThread">Global Thread </Link>
    </>
  )
}

export default MainNavigation
