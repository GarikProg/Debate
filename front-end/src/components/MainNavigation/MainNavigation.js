import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
// import { useTransition, animated } from 'react-spring'
import "./MainNavigation.scss"


function MainNavigation() {
  const threads = useSelector(state => state.mainThreads);
  
 return (
   <>
  
  <div className="mainContainer">
    <h1 className="mainPageHeader">Hot threads!</h1>
      <div className="descriptionContainer">
   {threads && threads.map(el => {
     return (
     <div className="description">
        <div className="innerDiv">{el.theme} ? {el.sideOne} : {el.sideTwo}</div>
            <div className="innerDescription">
              <h3 className="descriptionHeader">
              //:Description//
              </h3>
              <p className="descriptionInner">
              {el.description}
              </p>
              <p className="descriptionInner">
               Comments: {el.comments.length}
              </p>
        </div>
     </div>)
   })}
        <div className="description">
        <div className="innerDiv">Theme #3 ? side 1 : side 2</div>
        <div className="innerDescription">
        <h3 className="descriptionHeader">
          //:Description//
          </h3>
          <p className="descriptionInner">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          </div>
        </div>
      </div>
  </div>
   </>
 )
}

export default MainNavigation
