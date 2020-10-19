import React, {useState} from 'react'

export default function CreateThread() {
  const [formData, setFormData] = useState();

  const handleInput = (e) => {
    e.persist();
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch('http://localhost:3001/thread', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(formData)
    });
  };


  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} action="">
        <div><input onChange={(e) => handleInput(e)} required name="theme" placeholder="theme" type="text"/></div>
        <div><textarea onChange={(e) => handleInput(e)} required name="description" placeholder="description" type="text"/></div>
        <div><input onChange={(e) => handleInput(e)} required name="sideOne" placeholder="sideOne" type="text"/></div>
        <div><input onChange={(e) => handleInput(e)} required name="sideTwo" placeholder="sideTwo" type="text"/></div>
        <button>Create thread</button>
      </form>
    </div>
  )
}
