import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from "react-router-dom"
import Question from "../../images/quest2.png"
import Colon from "../../images/colon2.png"
import './createThread.scss';
import GlobalThread from '../../components/GlobalThread/globalThread'

export default function CreateThread() {
  const [formData, setFormData] = useState();
  const isAuthenticated = useSelector(state => state.isAuthenticated)

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
    <>
    <div className="createContainer">
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div className="formInner">
        <div className="descriptionContainer">
          <div className="themeDescription">
            Theme
          </div>
          <div className="sideOneDescription">
            Side One
          </div>
          <div className="sideTwoDescription">
            Side Two
          </div>
          </div>
        <div className="inputTheme"><input className="inputTheme2" onChange={(e) => handleInput(e)} required name="theme" type="text"/></div>
        <div><img className="questionPic" src={Question}></img></div>
        <div className="inputSideOne"><input className="inputTheme3" onChange={(e) => handleInput(e)} required name="sideOne" placeholder="sideOne" type="text"/></div>
        <div><img className="colonPic" src={Colon}></img></div>
        <div className="inputSideTwo"><input className="inputTheme4" onChange={(e) => handleInput(e)} required name="sideTwo" placeholder="sideTwo" type="text"/></div>
        </div>
        <div className="secondContainer">
        <div className="description"><input className="descriptionInner" onChange={(e) => handleInput(e)} required name="description" placeholder="description" type="text"/></div>
        <button className="threadButton"><Link className="threadButtonInner" to="/GlobalThread">Create thread</Link></button>
        </div>
      </form>
    </div>
    
  </>
  )
}
