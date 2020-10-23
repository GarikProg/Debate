import React, { memo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./comment.scss";
import heartImg from './heart.png'
import heartGradient from './heartGradient.png'
const comment = () => {
  const colorArr = ['one', 'two', 'three','four','five','six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen','fourteen', 'fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twentyone','twentytwo','twentythree']
    return colorArr[(Math.floor(Math.random() * 23))];
  }

export default memo(function Comment(props) {

  const isAuthorized = useSelector((state) => state.isAuthorized);
  const reduxUserId = useSelector(state => state.user._id)
  
  const user_id = useSelector((state) => state.user._id);
  const {
    comment_id,
    text,
    side,
    punch,
    likes,
    challenge,
    creator,
    socket,
  } = props;

  
  const reduxUserLikes = useSelector(state => state.user.likes);

  const [checkIfLiked, setCheck] = useState(false);

  useEffect(() => {
    reduxUserLikes && reduxUserLikes.forEach(likeId => {
      likes.forEach(threadLikeId => {
        if (likeId === threadLikeId) {
          setCheck(true)
        }
      })
    })
  }, []);

  let [likeToDisplay, setLikeToDisplay] = useState(likes.length)

  let sideToDisplay;

  if (side === 'Neutral') {
    sideToDisplay = false;
  } else {
    sideToDisplay = <span><span className='signs'>for: </span> <span className={comment()}>{ side }</span></span>;
  }

  return (
    <div className="fontSize">
      <div className={comment()}>
        <div>
          <span>_{ creator.name }({ creator.rating })_ </span> 
          {sideToDisplay && sideToDisplay}
        </div>
        <span >: {text}</span>
        <div>
          {isAuthorized ? (
            <>
            {user_id !== creator._id ? (
              <div>
                <span>
                  <button className="like" onClick={() => {
                    if (!checkIfLiked) {
                      setCheck(true);
                      punch(comment_id, socket, reduxUserId);
                      setLikeToDisplay(likeToDisplay += 1);
                    }
                    }}>
                    { checkIfLiked ? <img className='imgClass' src={ heartImg }/> : <img className='imgClass' src={ heartGradient }/> }
                  </button>
                  <span className="likeAmount">Likes: { likeToDisplay } </span>
                </span>
                <button className="challengeButton" onClick={ () => challenge(creator._id) }>
                Challenge
                </button>
              </div>
            ) : (
              <span className="likeAmount">Likes: { likeToDisplay } </span>
            )}
          </>
        ) : ('')}
        </div>
        <br/>
      </div>
    </div>
  );
})
