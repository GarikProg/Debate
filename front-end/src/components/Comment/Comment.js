import React from "react";
import { useSelector } from "react-redux";

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
  
  
  return (
    <div>
      <span>{nickName}___</span>
      <span>{side}___</span>
      <span>{text}___</span>
      <span>{likes && likes.length}</span>
      {isAuthorized ? (
        <>
          <button onClick={() => punch(index, comment_id, creator_comment)}>
            Like
          </button>
          {user_id !== creator_comment ? (
            <button onClick={() => challenge(creator_comment)}>
              Challenge
            </button>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
