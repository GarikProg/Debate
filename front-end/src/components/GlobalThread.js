import React, {useState, useEffect} from 'react'
import openSocket from 'socket.io-client'

function GlobalThread() {
  const [socket, setSocket] = useState()
  const [input, setInput] = useState('')
  const [outPut, setOutput] = useState([])
  
  
  
  useEffect(() => {
    const socket = openSocket('http://localhost:8000')
    setSocket(socket);    
  }, [])

          
  useEffect(() => {
    socket && socket.on('broadcast', data => {
      setOutput((prev) => {
      return [...prev, data]
      })})
  }, [socket])


  const handleSubmit = (e) => {    
    e.preventDefault();
    socket.send(input);
  } 
  
  return (
    <>
    <section>
  <div>
    <strong>NICK:</strong> <span>MESSAGE</span>
  </div>
</section>

<form onSubmit={(e) => handleSubmit(e)} id="messageForm">        
    <input onChange={(e) => setInput(e.target.value)} type="text" name="message" id="message"></input>
  <button type="submit">Отправить</button>  
</form>

  {outPut && outPut.map((el) => {return (<h5>{el}</h5>)
    
  })}
  </>)
}

export default GlobalThread

