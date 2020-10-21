import React, { useState } from "react";
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import './globalthreadAll.scss'

export default function GlobalThreadAll() {
  
  const isAuthorized = useSelector(state => state.isAuthorized)  

  const threads = useSelector(state => state.appThreads)

  return (
    <>
    <div>
      {threads &&
        threads.map((el) => {
          return (
          <div className="thread">
            <Link className="linkGlobal" to={`/GlobalThread/${el._id}`}><button className="theme" >{el.theme}</button></Link>
            <span className="question"> ? </span><span className="sideOne">{el.sideOne}</span> <span className="colon"> : </span><span className="sideTwo">{el.sideTwo}</span>
            </div>);
        })}        
    </div>
    <div>
      <br/>
    {isAuthorized && <Link to="/createThread"> <button>Create Thread</button>  </Link>}  
    </div>
    </>
  );
}
