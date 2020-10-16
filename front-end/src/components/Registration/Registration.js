import React, { useState } from 'react'
import { checkRegister } from '../../redux/actions'
import { useDispatch } from 'react-redux';

function Registration() {
  
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null)

  const dispatch = useDispatch()

  return (
    <>
    <form onSubmit={(e) => {
      e.preventDefault()
      dispatch(checkRegister({ name, email, password }));
      }}>
      <label>
        Nickname:
      <input type="text" required onChange={(e) => setName(e.target.value)}/>Enter ur nickname
      </label>
      <br></br>
      <label>
        Email:
      <input type="email" required onChange={(e) => setEmail(e.target.value)}/>Enter ur email
      </label>
      <br></br>
      <label>
        Password:
      <input type="password" required onChange={(e) => setPassword(e.target.value)}/>Enter ur password
      </label>
      <div><button type="submit">Register</button></div>
    </form>
    </>
  )
}

export default Registration
