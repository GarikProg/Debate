import React from "react";
import { useSelector } from "react-redux";

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
    <div>
      <span>{nickName}___</span>
      <span>{side}___</span>
      <span>{text}___</span>
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
