import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';


function Auth() {
  const [regState, setRegState] = useState(true);

  return (
    <>    
    <div>{regState ? <Login /> : <Registration />}</div>
    <button onClick={() => setRegState(!regState)}>{regState ? 'Еще не зарегестрированы?': 'Уже зарегестрированы? Войти!'}</button>
    <button><Link className="mainLinkStyle" to="/Home">Skip</Link></button>
    {/* <Link className="mainLinkStyle" to="/Home"> Skip2 </Link> */}

    </>
  )
}

export default Auth
