import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'

function Registration() {
  
  const history = useHistory();
  const [inputs, setInputs] = useState({
    nickname: '',
    email: '',
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
        nickname,
        email,
        password
      }),
    });
    if (resp.status === 200) {
      return history.push('./secret')
    }
    return setError('Try again')
  }

  function handleChange  ({target: {name, value}}) {
    setInputs({
      ...inputs,
      [name]: value
    })
  }
  const {nickname, email, password} = inputs;

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Nickname:
      <input name="nickname" type="text" required onChange={handleChange} value={nickname}/>Enter ur nickname
      </label>
      <br></br>
      <label>
        Email:
      <input name="email" type="email" required onChange={handleChange} value={email}/>Enter ur email
      </label>
      <br></br>
      <label>
        Password:
      <input name="password" type="password" required onChange={handleChange} value={password}/>Enter ur password
      </label>
      <div><button type="submit">Register</button></div>
    </form>
    </>
  )
}

export default Registration
