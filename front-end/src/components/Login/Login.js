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
      <label className="form-label" placeholder=" ">
      <input className="form-control" type="text" required onChange={(e) => setNameEmail(e.target.value)}/>
        <p className="labelP">Name or Email</p>
      {nameEmail && <p>{nameEmailError}</p>}
      </label>
      </div>
      <div className="form-group">
      <label className="form-label">
      <input type="password" className='form-control' required onChange={(e) => setPassword(e.target.value)}/>
        <p className="labelP">Password</p>
      {passwordError && <span>{passwordError}</span>}
      </label>
      </div>
      <div className="logBtn">
        <button className="loginBtn" onClick={() =>dispatch(checkSignIn({ nameEmail, password }))}>
          <Link className="loginLink" to="/Home">Sign In</Link>
      </button>
      </div>
      </form>
      </div>
    </>
  )
}

export default Login
