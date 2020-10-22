import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Comment from "../CommentDebate/CommentDebate";

function Debate() {
  const [socket, setSocket] = useState();
  const [text, setText] = useState("");
  const [outPut, setOutput] = useState();
  const [side, setSide] = useState("Neutral");
  const [debate, setDebate] = useState({});

  const { id } = useParams();

  const nickName = useSelector((state) => state.user.name);
  const creator = useSelector((state) => state.user._id); 

  useEffect(() => {
    (async () => {
      const response = await fetch(`/debate/${id}`);
      const resp = await response.json();
      setOutput(resp.comments);
      setDebate(resp);
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
        console.log(data);
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
    socket.send({
      type: "comment",
      text,
      id,
      side,
      nickName,
      creator,
      from: "debate",
    });
  };

  const punch = (index, comment_id, creator_comment) => {
    let isLike = 0;
    outPut[index].likes &&
      outPut[index].likes.forEach((element) => {
        if (element.creator === creator) {
          isLike += 1;
        }
      });
    if (creator_comment !== creator && isLike === 0) {
      socket.send({ type: "like", comment_id, creator, id });
    }
  };
  return (
    <>
      <h1>First debator: {debate.creator?.name}</h1>
      <h1>Second debator: {debate.participant?.name}</h1>
      {creator === debate.creator?._id || creator === debate.participant?._id ? (
        <>
          {" "}
          <section>
            <div>
              <strong>NICK: {nickName}</strong>
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
        </>
      ) : (
        ""
      )}
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
              />
            );
          })}
      </div>
    </>
  );
}

export default Debate;
