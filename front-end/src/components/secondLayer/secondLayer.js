import React, {useEffect, useRef} from 'react';
import { Link } from 'react-router-dom'
import gsap from 'gsap';
import {
  staggerText,
  staggerReveal,
  fadeInUp,
  handleHover,
  handleHoverExit,
  staggerRevealClose
} from "./Animations";
import './secondlayer.scss'

const SecondLayer = ({ state }) => {

  let menuLayer = useRef(null);
  let reveal1 = useRef(null);
  let reveal2 = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let line4 = useRef(null);
  let info = useRef(null);

  useEffect(() => {
    if (state.clicked === false) {
  

      staggerRevealClose(reveal2, reveal1);
  
      gsap.to(menuLayer, { duration: 1, css: { display: "none" } });
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {

      gsap.to(menuLayer, { duration: 0, css: { display: "block" } });
      gsap.to([reveal1, reveal2], {
        duration: 0,
        opacity: 1,
        height: "100%"
      });
      staggerReveal(reveal1, reveal2);
      fadeInUp(info);
      staggerText(line1, line2, line3, line4);
    }
  }, [state]);



  return (
    <div ref={el => (menuLayer = el)} className="secondLayerMenu">
      <div  ref={el => (reveal1 = el)} className="menu-secondary-background-color">
        <div ref={el => (reveal2 = el)} className="menu-layer">
          <div className="routeBackground">
             </div>
             <div className="container">
               <div className="wrapper">
                 <div className="menu-links">
                 <nav>
                <ul>
                  <li>
                    <Link
                      to='/GlobalThread'>
                      <div
                      onMouseEnter={e => handleHover(e)}
                      onMouseOut={e => handleHoverExit(e)}
                      ref={el => (line1 = el)}>Thread</div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/About'>
                      <div  
                      onMouseEnter={e => handleHover(e)}
                      onMouseOut={e => handleHoverExit(e)}
                      ref={el => (line2 = el)}>About</div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/Profile'>
                      <div  
                      onMouseEnter={e => handleHover(e)}
                      onMouseOut={e => handleHoverExit(e)}
                      ref={el => (line3 = el)}>Profile</div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/CreateThread'>
                      <div  
                      onMouseEnter={e => handleHover(e)}
                      onMouseOut={e => handleHoverExit(e)}
                      ref={el => (line4 = el)}>Create</div>
                    </Link>
                  </li>
                </ul>
              </nav>
                  <div ref={el => (info = el)} className="info">
                      <h1>
                    <div className="animation-content-line">
                      <div className="animation-content-line-inner1">About us:</div>
                    </div>
                    <div className="animation-content-line">
                      <div className="animation-content-line-inner2"><br></br>Debates is fresh sketch on an old theme. <br /> We are trying to make your internet arguments constructive. </div>  
                    </div>
                    <div className="animation-content-line">
                      <div className="animation-content-line-inner3">Someone on the web is not correct? Give us a chance!</div>
                    </div>
                  </h1>
                  </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>    
  )
}

export default SecondLayer
