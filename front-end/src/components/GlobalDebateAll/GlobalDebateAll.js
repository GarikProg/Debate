import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import {useSelector} from 'react-redux'

export default function DebateThreadAll() {
  const [debates, setDebates] = useState([]);
  const isAuthenticated = useSelector(state => state.isAuthenticated)
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3001/debate");
      const resp = await response.json();
      console.log(resp);
      setDebates(resp.debates);
    })();
  }, []);

  return (
    <>
    <div>
      {debates &&
        debates.map((el) => {
          return (
          <div>
            <Link to={`/GlobalThread/${el._id}`}><button>{el.theme}</button> </Link>
            
            </div>);
        })}        
    </div>
    <div>
      <br/>
    {!isAuthenticated && <Link to="/createDebate"> <button>Create Debate</button>  </Link>}  
    </div>
    </>
  );
}
