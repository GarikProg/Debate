import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./comment.scss"

export default function Comment(props) {
  const isAuthorized = useSelector((state) => state.isAuthorized);
  const user_id = useSelector((state) => state.user._id);
  
  const {
    nickName,
    side,
    text,
    comment_id,
    punch,
    creator_comment,
    likes,
    index,
    challenge,
  } = props;
  
  const comment = () => {
  const colorArr = ['one', 'two', 'three','four','five','six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen','fourteen', 'fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twentyone','twentytwo','twentythree']
    return colorArr[(Math.floor(Math.random() * 23))];
  }


  let toDisplay;

  if (side === 'Neutral') {
    toDisplay = false;
  } else {
    toDisplay = <span><span className='signs'>for: </span> <span className={comment()}>{side}</span></span>;
  }


  return (
    <div className="fontSize">
    <div className={comment()}>
      <div><span>_{nickName}_ </span> 
      {toDisplay && toDisplay}
      </div>
      {/* <span>{side}_</span> */}
      : <span >{text}</span>
      <div>{isAuthorized ? (
        <>
          {user_id !== creator_comment ? (
            <div>
              <span>
                
                <button className="like" onClick={() => punch(index, comment_id, creator_comment)}>💕</button>
                <span className="likeAmount">: {likes && likes.length} </span>
              </span>
              <button className="challengeButton" onClick={() => challenge(creator_comment)}>
              Challenge
              </button>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}</div>
      <br></br>

    </div>
    </div>
  );
}
