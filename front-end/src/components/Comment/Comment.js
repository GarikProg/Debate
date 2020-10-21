import React from "react";
import { useSelector } from "react-redux";
import "./comment.scss"

export default function Comment(props) {
  const isAuthorized = useSelector((state) => state.isAuthorized);

  const {
    nickName,
    side,
    text,
    comment_id,
    punch,
    creator_comment,
    likes,
    index,
  } = props;
  return (
    <div className="comment">
      <div><span>_{nickName}_</span></div>
      <span>{side}_</span>
      <span>{text}_</span>
      <span>{likes && likes.length}</span>
      {isAuthorized ? (
        <button onClick={() => punch(index, comment_id, creator_comment)}>
          Like
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
