import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import './globalthreadAll.scss'
import { loadThreads } from '../../redux/actions'

export default function GlobalThreadAll() {
  
  const isAuthorized = useSelector(state => state.isAuthorized) 
  const dispatch = useDispatch();

  const threads = useSelector(state => state.appThreads);

  useEffect(() => {
    dispatch(loadThreads());
  }, [])

  return (
    <>
    <div className="threads">
      {threads &&
        threads.map((el) => {
          return (
            <div className="threadInnerParentDiv">
          <div className="thread">
            <div className="threadInner">
            <Link className="linkGlobal" to={`/GlobalThread/${el._id}`}><button className="theme" >{el.theme}</button></Link>
            </div>
            </div>
            <div className="threadInner2">
            <span className="question">&nbsp;  ?&nbsp;  </span><span className="sideOne">{el.sideOne}</span> <span className="colon"> &nbsp; : &nbsp; </span><span className="sideTwo">{el.sideTwo}</span>
            </div>
            </div>);
        })}        
    </div>
    <div>
      <br/>
    {isAuthorized && <Link to="/createThread"> <button className="threadBtnInner">Create Thread</button>  </Link>}  
    </div>
    </>
  );
}
