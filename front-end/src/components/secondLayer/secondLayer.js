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

const SecondLayer = ({ state }) => {

  let menuLayer = useRef(null);
  let reveal1 = useRef(null);
  let reveal2 = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
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
      staggerText(line1, line2, line3);
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
                      ref={el => (line1 = el)}>Debate</div>
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
                </ul>
              </nav>
                  <div ref={el => (info = el)} className="info">
                    <h3>
                      About us
                    </h3>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
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
