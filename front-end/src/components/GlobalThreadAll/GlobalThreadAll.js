import React, { useState } from "react";
import {Link} from "react-router-dom"
import {useSelector} from 'react-redux'

export default function GlobalThreadAll() {
  // const [threads, setThreads] = useState([]);
  const isAuthorized = useSelector(state => state.isAuthorized)  
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("http://localhost:3001/thread");
  //     const resp = await response.json();      
  //     setThreads(resp.threads);
  //   })();
  // }, []);

  const threads = useSelector(state => state.appThreads)

  return (
    <>
    <div>
      {threads &&
        threads.map((el) => {
          return (
          <div>
            <Link to={`/GlobalThread/${el._id}`}><button>{el.theme}</button> </Link>
            
            </div>);
        })}        
    </div>
    <div>
      <br/>
    {!isAuthorized && <Link to="/createThread"> <button>Create Thread</button>  </Link>}  
    </div>
    </>
  );
}
