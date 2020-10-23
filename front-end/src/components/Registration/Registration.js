import React, { useState } from 'react'
import { checkRegister } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import './registration.scss'

function Registration() {
  
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null)

  const dispatch = useDispatch()

  const nameError = useSelector(state => state.registerNameError);
  const emailError = useSelector(state => state.registerEmailError);


  return (
    <>
    <form className="form" onSubmit={(e) => {
      e.preventDefault()
      dispatch(checkRegister({ name, email, password }));
      }}>
      <div className="form-group">
        <label className="form-label" placeholder=" ">
          <input className="form-control" type="text" placeholder=" " required onChange={(e) => setName(e.target.value)}/>
          <p className="labelP">Name</p>
        </label>
        { nameError && <p style={{color: 'red'}}>{nameError}</p> }
      </div>
      <br/>
      <br></br>
      <div className="form-group">
        <label className="form-label">
          <input className="form-control" type="email" placeholder=" " required onChange={(e) => setEmail(e.target.value)}/>
          <p className="labelP">Email</p> 
        </label>  
        { emailError && <p style={{color: 'red'}}>{emailError}</p> }
      </div>
      <br />
      <br/>
      <div>
        <label className="form-label">
          <input className="form-control" type="password" placeholder=" " required onChange={(e) => setPassword(e.target.value)}/>
          <p className="labelP">Password</p>
        </label>
      </div>
      <br/>
      <div>
        <button className="loginBtn" type="submit">
          <div className="loginLink">Register</div>
        </button>
        </div>
    </form>
    </>
  )
}

export default Registration
