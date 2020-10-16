import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(()=>{
    (async ()=>{
      await fetch('/api/logout');
      dispatch({
        type: "LOGOUT"
      });
      history.push('/')
    })();

  },[])
  return (
    'logging out'
  )
}

export default Logout
