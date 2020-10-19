import React, { useState } from 'react'
import { checkSignIn } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';

function Login() {

  const dispatch = useDispatch();

  const [nameEmail, setNameEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const nameEmailError = useSelector(state => state.loginNameEmailError);
  const passwordError = useSelector(state => state.loginPasswordError);
  const isAuthorized = useSelector(state => state.isAuthorized);


  return (
    <>
      <label>
        Name or Email:
      <input name="nameEmail" type="text" required onChange={(e) => setNameEmail(e.target.value)}/>
      {nameEmail && <span>{nameEmailError}</span>}
      </label>
      <br></br>
      <label>
        Password:
      <input type="password" name='password' required onChange={(e) => setPassword(e.target.value)}/>
      {passwordError && <span>{passwordError}</span>}
      </label>
      <div><button onClick={() =>dispatch(checkSignIn({ nameEmail, password }))}>
      {isAuthorized ? <Redirect to="/Home">Login</Redirect> : 'Login'}</button></div>
    </>
  )
}

export default Login
