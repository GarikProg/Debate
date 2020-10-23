import React from "react";
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

export default function DebateThreadAll() {
  const debates = useSelector(state => state);
  const isAuthorized = useSelector(state => state.isAuthorized)
  

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
      {<Link to="/createDebate"> <button>Create Debate</button>  </Link>}  
    </div>
    </>
  );
}
