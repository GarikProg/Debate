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
      <form className="form" onSubmit={(e) => {
        e.preventDefault()
        dispatch(checkSignIn({ nameEmail, password }));
      }}>
        <div className="form-group">
          <label className="form-label">
            <input className="form-control" type="text" placeholder=" " required onChange={(e) => setNameEmail(e.target.value)}/>
              <p className="labelP">Name or Email</p>
            {nameEmail && <p>{nameEmailError}</p>}
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            <input type="password" className='form-control' placeholder=" " required onChange={(e) => setPassword(e.target.value)}/>
              <p className="labelP">Password</p>
            {passwordError && <span>{passwordError}</span>}
          </label>
        </div>
        <div className="logBtn">
          <button className="loginBtn" type='submit'>
            Sign In
          </button>
        </div>
      </form>
    </div>
    </>
  )
}

export default Login
