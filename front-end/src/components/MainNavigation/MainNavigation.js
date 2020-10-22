import React, {useState, useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import gsap from 'gsap';
import "./MainNavigation.scss"


function MainNavigation() {
  let mainAnimation = useRef(null);
  let mainAnimation2 = useRef(null);

  useEffect(() => {
    gsap.to(mainAnimation, {
      duration: 0.8,
      x: -15,
      y: -15,
      delay: 0.3,
      ease: "power3.inOut"
    });
    gsap.to(mainAnimation2, {
      duration: 0.8,
      x: 15,
      y: -15,
      delay: 0.3,
      ease: "power3.inOut"
    });
  })



  const threads = useSelector(state => state.mainThreads)
  console.log(threads);
 return (
   <>
  
  <div className="mainContainer">
    <div className="mainPageHeader"><h1 ref={el => (mainAnimation = el)}>Hot</h1>&nbsp;<h1 ref={el => (mainAnimation2 = el)}>threads!</h1></div>
      <div className="descriptionContainer">
   {threads && threads.map(el => {
     return (
     <div className="description">
        <Link className="mainLink" to={`/GlobalThread/${el._id}`}><div className="innerDiv" >{el.theme} ? {el.sideOne} : {el.sideTwo}</div></Link>
            <div className="innerDescription">
              <h3 className="descriptionHeader">
              Description:
              </h3>
              <p className="descriptionInner">
              {el.description}
              </p>
              <p className="descriptionInner">
               Comments: {el.comments.length}
              </p>
        </div>
     </div>
     )
   })}
        <div className="description">
        <div className="innerDiv">Choose the better pokemon ? Charizard : Blastoise </div>
        <div className="innerDescription">
        <h3 className="descriptionHeader">
          Description:
          </h3>
          <p className="descriptionInner">
          Blastoise is a water type based pokemon, who also is a final evolution of Squirtle. He definetly is supposed to overpower Charizard. But! Charizard is an insanely powerful pokemon. There is basically a very small amount of pokemon regardless of type who can even compete with him. Choose wisely!
          </p>
          </div>
        </div>
      </div>
  </div>
   </>
 )
}

export default MainNavigation
