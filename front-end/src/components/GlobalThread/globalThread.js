import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Comment from "../Comment/Comment";

function GlobalThread() {
  const [socket, setSocket] = useState();
  const [text, setText] = useState("");
  const [outPut, setOutput] = useState([]);
  const [side, setSide] = useState("");
  const [thread, setThread] = useState({});

  const { id } = useParams();

  const nickName = useSelector((state) => state.user.username); 
  const creator = useSelector((state) => state.user.id);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3001/thread/${id}`);
      const resp = await response.json();
      setThread(resp.thread);
      setOutput(resp.comments);
    })();
  }, []);

  useEffect(() => {
    const socket = openSocket("http://localhost:8000", {
      query: {
        id,
      },
    });
    setSocket(socket);
  }, []);

  useEffect(() => {
    socket &&
      socket.on("broadcast", (data) => {
        if(data.type === "comment")
        setOutput((prev) => {
          return [...prev, data];
        });
        if(data.type === "like")
        setOutput((prev) => {
          prev.map((el, i) => {
            if(el._id === data.comment_id) {
              return {
                ...el,
                likes: el.likes.push(data.creator)
              };
            }
            return el;
          });
        })
      });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.send({ type: "comment", text, id, side, nickName, creator });
  };

  const punch = (comment_id, creator_comment) => { 
    let isLike = 0;  
    outPut.forEach(element => {
      if(element.likes.includes(creator)) {
        isLike += 1;
      }
    });
    if((isLike === 0) && creator !== creator_comment) {    
    socket.send({ type: "like", comment_id, creator });
  } 
    }   
  

  return (
    <>
      <section>
        <div>
          <strong>NICK:</strong> <span>MESSAGE</span>
        </div>
      </section>
      <h1>{thread.theme}</h1>
      <div>
        <span>
          <button onClick={() => setSide(thread.sideOne)}>
            {thread.sideOne}
          </button>
        </span>
        <span>
          <button onClick={() => setSide(thread.sideTwo)}>
            {thread.sideTwo}
          </button>
        </span>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} id="messageForm">
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          name="message"
          id="message"
        ></input>
        <button type="submit">Punch</button>
      </form>

      {outPut &&
        outPut.map((el) => {
          return (
            <Comment
              key={el._id}
              comment_id={el._id}
              text={el.text}
              side={el.side}
              nickName={el.nickName}
              creator_comment={creator}
              likes={el.likes}
              punch={punch}
            />
          );
        })}
    </>
  );
}

export default GlobalThread;
