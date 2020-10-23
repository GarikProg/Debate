import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import './auth.scss'


function Auth() {
  const [regState, setRegState] = useState(true);

  return (
    <>    
    <div className="authContainer">
    <div className="containerInner">{regState ? <Login /> : <Registration />}</div>
    <br></br>
    <Link className="skipLink" to="/Home"><button className="authBtn2">Skip</button></Link>
    <button className="authBtn" onClick={() => setRegState(!regState)}>{regState ? 'Еще не зарегестрированы?': 'Уже зарегестрированы? Войти!'}</button>
    {/* <Link className="mainLinkStyle" to="/Home"> Skip2 </Link> */}
    </div>
    </>
  )
}

export default Auth
