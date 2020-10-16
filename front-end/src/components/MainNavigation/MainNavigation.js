import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import "./MainNavigation.scss"


function MainNavigation() {
  const [index, set] = useState(0)
  const [index2, set2] = useState(1)

  const pages = [
    ({ style }) => <animated.div style={{...style}}>
    <h1>Local</h1>
    <div className="threadNameOne">
    <h3 className="threadNameOneHeader">Thread name goes here</h3>
    <div className="threadNameTwoInner">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
    </div>
    <div className="threadNameTwo">
    <h3 className="threadNameTwoHeader">Thread name #2 goes here</h3>
    <div className="threadNameTwoInner">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
    </div>
    <div className="threadNameThree">
    <h3 className="threadNameTwoHeader">Thread name #3 goes here</h3>
      <div className="threadNameThreeInner">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
      </div>
    <button className="LocalThread">
    <Link to="/LocalThread">Explore more </Link>
    </button>
    </animated.div>,
     ({ style }) => <animated.div style={{...style}}>
       <h1>Global</h1>
       <div className="threadNameOne">
    <h3 className="threadNameOneHeader">Thread name goes here</h3>
    <div className="threadNameTwoInner">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
    </div>
    <div className="threadNameTwo">
    <h3 className="threadNameTwoHeader">Thread name #2 goes here</h3>
    <div className="threadNameTwoInner">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
    </div>
    <div className="threadNameThree">
    <h3 className="threadNameTwoHeader">Thread name #3 goes here</h3>
      <div className="threadNameThreeInner">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
      </div>
    <button className="globalThread">
      <Link to="/GlobalThread">Explore more </Link>
      </button>
      </animated.div> ]

  const transitions1 = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })
  const transitions2 = useTransition(index2, p => p, {
    from: { opacity: 0, transform: 'translate3d(50%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(50%,0,0)' },
  })

  return (
    // <>
    // <div className="navBar">
    // <div>
    // <button><Link to="/LocalThread">Explore more </Link></button>
    // </div>
    // <div>
    //  <button><Link to="/GlobalThread">Explore more </Link></button>
    //  </div>
    //  </div>
    // </>
    <>
    <div className="simple-trans-main1">
      {transitions1.map(({ item, props, key }) => {
        const Page = pages[item]
        return <Page key={key} style={props} />
      })}
      </div>
      <div className="simple-trans-main2">
       {transitions2.map(({ item, props, key }) => {
         console.log(item)
        const Page = pages[item]
        console.log(Page )
        return <Page key={key} style={props} />
      })}
      </div>
    </>
  )
}

export default MainNavigation
