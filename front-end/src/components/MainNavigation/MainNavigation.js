import React from 'react';
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
        <Link to={`/GlobalThread/${el._id}`}><div className="innerDiv" >{el.theme} ? {el.sideOne} : {el.sideTwo}</div></Link>
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
