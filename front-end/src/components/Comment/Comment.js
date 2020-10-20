import React from 'react'

export default function Comment(props) {
  const {nickName, side, text, comment_id, punch, creator_comment, likes } = props;
  return (
    <div>
      <span>{nickName}</span>
      <span>{side}</span>
      <span>{text}</span>
  <span>{likes.length}</span>
      <input type="checkbox" name="" onClick={() => punch(comment_id, creator_comment)}/>
    </div>
  )
}
