import React, { useRef, useEffect} from 'react'
import './About.scss'
import MainPage from '../MainPage/MainPage';
import {Link} from 'react-router-dom';
import {TweenMax, TimelineLite, Power3} from 'gsap';


function About() {

  let app = useRef(null);
  let images = useRef(null);
  let content = useRef(null);

  let tl = new TimelineLite()
  
  useEffect(() => {

    const headlineFirst = content.children[0].children[0];
    const headlineSecond = headlineFirst.nextSibling;
    const headlineThird = headlineSecond.nextSibling;


    TweenMax.to(app, 0, {css: {visibility: 'visible'}})


    tl.staggerFrom([headlineFirst.children, headlineSecond.children, headlineThird.children ], 1, {
      y: 44,
      x: 22,
      ease:Power3.easeOut,
      delay: .1
    }, .20, 'Start')
  }, [tl])
  
  return (
    <>
    <div className="aboutUs" ref={el => app = el}>
      <div className="container">
        <div className="animation-inner">
          <div className="animation-content">
          <div className="animation-content-inner" ref={el => content = el}>
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
    <div className="main">
    <button className="aboutBtn">
    <Link className="aboutPageLinkStyle" to="/MainPage">
      <span className="firstSpan"></span>
      <span className="secondSpan"></span>
      <span className="thirdSpan"></span>
      <span className="fourthSpan"></span>
      Start Debating
      </Link>
    </button>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default About
