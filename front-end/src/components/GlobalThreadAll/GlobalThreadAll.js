import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"

export default function GlobalThreadAll() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3001/thread");
      const resp = await response.json();
      console.log(resp);
      setThreads(resp.threads);
    })();
  }, []);

  return (
    <div>
      {threads &&
        threads.map((el) => {
          return (
          <div>
            <Link to={`/GlobalThread/${el._id}`}><button>{el.theme}</button> </Link>
            
            </div>);
        })}
    </div>
  );
}
