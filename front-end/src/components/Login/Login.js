import React, { useState } from 'react'
import { checkSignIn } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import './login.scss'

function Login() {

  const dispatch = useDispatch();

  const [nameEmail, setNameEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const nameEmailError = useSelector(state => state.loginNameEmailError);
  const passwordError = useSelector(state => state.loginPasswordError);
  const isAuthorized = useSelector(state => state.isAuthorized);


  return (
    <>
    <div className="formContainer">
      <form className="form">
      <div className="form-group">
      <input className="form-control" type="text" required onChange={(e) => setNameEmail(e.target.value)}/>
      <label for="name" className="form-label">
        Name or Email
      {nameEmail && <p>{nameEmailError}</p>}
      </label>
      </div>
      <div className="form-group">
      <input type="password" className='form-control' required onChange={(e) => setPassword(e.target.value)}/>
      <label for="password" className="form-label">
        Password
      {passwordError && <span>{passwordError}</span>}
      </label>
      </div>
      <div className="logBtn">
        <button onClick={() =>dispatch(checkSignIn({ nameEmail, password }))}>
      {isAuthorized ? <Redirect to="/Home">Login</Redirect> : 'Login'}
      </button>
      </div>
      </form>
      </div>
    </>
  )
}

export default Login
