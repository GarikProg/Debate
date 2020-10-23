import React, { useState, useEffect, useCallback } from "react";
import openSocket from "socket.io-client";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Comment from "../Comment/Comment";
import { createNewDebate, addLikeToUserInRedux, addCommentToUserInRedux, changeCommetWritingPermission, setCommetWritingCooldown, addCommentCountToCommentsInRedux } from '../../redux/actions'
import './globalthread.scss'

const comment = () => {
  const colorArr = ['one', 'two', 'three','four','five','six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen','fourteen', 'fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twentyone','twentytwo','twentythree']
  return colorArr[(Math.floor(Math.random() * 23))];
};

function GlobalThread() {

  const { id } = useParams();
  const dispatch = useDispatch();

  const [socket, setSocket] = useState();
  const [text, setText] = useState("");
  const [outPut, setOutput] = useState([]);
  const [side, setSide] = useState("Neutral");
  const [thread, setThread] = useState({});
  const [colors, setColors] = useState(["red", "red", "red"])

  useEffect(() => {
    setColors(state => ([comment(), comment(), comment()]))
  }, [])

  

  const nickName = useSelector((state) => state.user.name);  
  
  const creator = useSelector((state) => state.user._id);
  
  const isAuthorized = useSelector(state => state.isAuthorized);
  
  // Логика кулдауна
  const coolDown = useSelector(state => state.commentWritingTimeout);
  const canWriteComment = useSelector(state => state.canWriteComment);

  // Конвертер времени для отображения
  function convertNumberToTime(num) {
    let seconds = num % 60;
    let minutes = Math.floor(num / 60);
    return `${minutes}:${seconds}`;
  };

  // Подгружаем конкретный тред из редакса
  const appThreads = useSelector(state => state.appThreads)
  useEffect(() => {
    appThreads && appThreads.filter(el => {
      if (el._id == id) {
        setThread(el);
        setOutput(el.comments)
      }
    });
  }, [appThreads]);

  useEffect(() => {    
    const socket = openSocket("http://localhost:8000", {
      query: {
        id,
        nickName,
      },
    });
    setSocket(socket);
  }, []);

  useEffect(() => {
    socket &&
      socket.on("broadcast", (data) => {
        if (data.commentLocation) {
          // Присылает класс Comment
          console.log(data);
          dispatch(addCommentToUserInRedux(data))
          dispatch(addCommentCountToCommentsInRedux(id, data))
          setOutput((prev) => {
            return [...prev, data];
          });
        }
        if (data.comment) {
          // Присылает класс Like
          dispatch(addLikeToUserInRedux(data));
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
    // Отправка комментария на бек
    dispatch(changeCommetWritingPermission());
    dispatch(setCommetWritingCooldown(60));

    socket.send({ type: "comment", text, id, side, nickName, creator, from: "thread" });
  };


  const punch =   useCallback((index, comment_id, creator_comment) => {
    let isLike = 0;    
    outPut[index].likes && outPut[index].likes.forEach((element) => {
      if (element.creator === creator) {
        isLike += 1;
      }
    });       
    if (creator_comment !== creator && isLike === 0) {
      // Отправка лайка на бек
      socket.send({ type: "like", comment_id, creator, id });
    }
  }, [])
  
  const challenge = useCallback((comment_creator) => {
    console.log(creator, 'ghggh', comment_creator);
    dispatch(createNewDebate( {creator, participant: comment_creator}))
  },[])

  return (
    <>
      <div className="headers">
        <div>
          <strong>
            <div>Your nickname: </div>
            <div className={`${colors[2]} nickClass`}>{nickName}</div>
          </strong> 
        </div>
        <div>
          <h1>
            <div>Theme: </div>
            <div className={colors[0]}>{thread.theme}</div>
          </h1>
        </div>
      <div>
        <h2>
          <div>Description: </div>
          <div className={colors[1]}>{thread.description}</div>
        </h2>
      </div>
      <div>
        <span>
          <button className="challengeButton"  onClick={() => setSide(thread.sideOne)}>
            {thread.sideOne}
          </button>
        </span>
        <span>
          <button className="challengeButton"  onClick={() => setSide(thread.sideTwo)}>
            {thread.sideTwo}
          </button>
        </span>
    {isAuthorized ?
    <>
      <section>
        <form className="inputForm" id="messageForm" onSubmit={ (e) => handleSubmit(e) }>
          <input className="challengeButton"
            onBlur={(e) => {
              e.preventDefault();
              setText(e.target.value)
            }}
            type="text"
            name="message"
            id="message"
          />
          {canWriteComment ? <button className="challengeButton"type="submit">Punch</button> : <div>Следующий комментарий можно писать через { convertNumberToTime(coolDown) }</div>}
        </form>
      </section>
    </> : <> <Link to="/Auth"><button>Sign in to punch and vote</button></Link> </>}      
      </div>  
    </div>
      <div>
      {outPut &&
        outPut.map((el, index) => {
          return (
            <Comment
              key={ el._id }
              index={ index }
              comment_id={ el._id }
              text={ el.text }
              side={ el.side }
              likes={ el.likes }
              punch={ punch }
              challenge={ challenge }
              creator={ el.creator }
            />
          );
        })}
      </div>
    </>
  );
}

export default GlobalThread;
