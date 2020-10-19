import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import { useParams } from "react-router-dom";
import {useSelector} from 'react-redux'

function GlobalThread() {
  const [socket, setSocket] = useState();
  const [input, setInput] = useState("");
  const [outPut, setOutput] = useState([]);
  const [side, setSide] = useState("");
  const [thread, setThread] = useState({});
  
  const { id } = useParams();

  const nickName = 'Dabate king'//useSelector(state => state.data.nickName)

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3001/thread/${id}`);
      const resp = await response.json();
      setThread(resp.thread);
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
        setOutput((prev) => {
          return [...prev, data];
        });
      });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.send({ input, id, side, nickName});
  };

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
          <button onClick={() => setSide(thread.sideOne)}>{thread.sideOne}</button>
        </span>
        <span>
          <button onClick={() => setSide(thread.sideTwo)}>{thread.sideTwo}</button>
        </span>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} id="messageForm">
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          name="message"
          id="message"
        ></input>
        <button type="submit">Punch</button>
      </form>

      {outPut &&
        outPut.map((el) => {
          return <h5><span>{el.input}</span>: <span>{el.side}</span> : <span>{el.nickName}</span> </h5>;
        })}
    </>
  );
}

export default GlobalThread;
