import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputs, setInputs] = useState({
    nameEmail: '',
    password: '',
  })
  const [error, setError] = useState(false)

  async function handleSubmit (e) {
    e.preventDefault();
    const resp = await fetch("/api/login", {        // <= ?????
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nameEmail,
        password,
      }),
    });
    if (resp.status === 200) {
      dispatch({
        type: "AUTHENTICATED_SUCCESSFULLY",
      })
      return history.push('./secret')
    }
    dispatch({
      type: "AUTHENTICATED_UNSUCCESSFULLY",
    })
    return setError('Try again')
  }

  function handleChange  ({target: {name, value}}) {
    setInputs({
      ...inputs,
      [name]: value
    })
  }
  const {nameEmail, password} = inputs;

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        NameEmail:
      <input name="nameEmail" type="text" required onChange={handleChange} value={nameEmail}/>Enter ur nickname or email
      </label>
      <br></br>
      <label>
        Password:
      <input name="password" type="password" required onChange={handleChange} value={password}/>Enter ur password
      </label>
      <div><button type="submit">Login</button></div>
    </form>
    </>
  )
}

export default Login
