import React from 'react'

export default function Comment(props) {
  const {nickName, side, text, id, punch } = props;
  return (
    <div>
      <span>{nickName}</span>
      <span>{side}</span>
      <span>{text}</span>
      <input type="checkbox" name="" onClick={() => punch(id)}/>
    </div>
  )
}
