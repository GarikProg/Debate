import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Comment from "../Comment/Comment";
import {createNewDebate} from '../../redux/actions'

function GlobalThread() {
  const [socket, setSocket] = useState();
  const [text, setText] = useState("");
  const [outPut, setOutput] = useState([]);
  const [side, setSide] = useState("Neutral");
  const [thread, setThread] = useState({});

  const { id } = useParams();

  const nickName = useSelector((state) => state.user.name);  

  const creator = useSelector((state) => state.user._id);

  const isAuthorized = useSelector(state => state.isAuthorized);
  const  dispatch = useDispatch();

  useEffect(() => {    
    (async () => {
      const response = await fetch(`/thread/${id}`);
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
        if (data.commentLocation) {
          setOutput((prev) => {
            return [...prev, data];
          });
        }
        if (data.comment) {
          console.log(data);
          setOutput((prev) =>                    
            prev.map((el, i) => {
              if (el._id === data.comment) {                
                return {
                  ...el,
                   likes: [...el.likes, data],
                };
              }
              return el;
            })
          );
         }        
      });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.send({ type: "comment", text, id, side, nickName, creator });
  };

  const punch = (index, comment_id, creator_comment) => {
    let isLike = 0;    
    outPut[index].likes && outPut[index].likes.forEach((element) => {
      if (element.creator === creator) {
        isLike += 1;
      }
    });       
    if (creator_comment !== creator && isLike === 0) {
      socket.send({ type: "like", comment_id, creator, id });
    }
  };

  const challenge = (comment_creator) => {
    console.log(creator, 'ghggh', comment_creator);
    dispatch(createNewDebate( creator, comment_creator))
  }
  return (
    <>
      <h1>{thread.theme}</h1>
      <h2>{thread.description}</h2>
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
    {isAuthorized ? <> <section>
        <div>
          <strong>NICK:  {nickName}</strong> <span>MESSAGE</span>
        </div>
      </section>
      <form onSubmit={(e) => handleSubmit(e)} id="messageForm">
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          name="message"
          id="message"
        ></input>
        <button type="submit">Punch</button>
      </form>
      </> : <Link to="/Auth"><button>Sign in to punch and vote</button> </Link>}      
<div>
      {outPut &&
        outPut.map((el, index) => {
          return (
            <Comment
              key={el._id}
              index={index}
              comment_id={el._id}
              text={el.text}
              side={el.side}
              nickName={el.nickName}
              creator_comment={el.creator}
              likes={el.likes}
              punch={punch}
              challenge={challenge}
            />
          );
        })}
        </div>
    </>
  );
}

export default GlobalThread;
