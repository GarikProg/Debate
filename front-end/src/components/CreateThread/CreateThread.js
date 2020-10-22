import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Question from "../../images/quest4.png"
import Colon from "../../images/colon4.png"
import { createNewThread } from '../../redux/actions';
import './createThread.scss';
import { Redirect } from 'react-router-dom';

export default function CreateThread() {

  const creatorRedux = useSelector(state => state.user._id);

  // при успешном создании треда - переводит куда вам надо, при неудаче - передводит на страницу или модально с ошибкой!!!!
  const succsessThreadCreate = useSelector(state => state.successfulThreadCreate);
  // при обишке бд - модалка/окно с текстом ошибки бд, попробуйте снова
  const dbError = useSelector(state => state.dbError);

  const [formData, setFormData] = useState();

  const dispatch = useDispatch();

  const handleInput = (e) => {
    e.persist();
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
        creator: creatorRedux,
      };
    });
  }

  return (
    <>
    <div className="createContainer">
      <form className="form1" onSubmit={(e) => {
        e.preventDefault()
        dispatch(createNewThread(formData));
      }}>
                  <br></br>
                  <br></br>
                  <br></br>

        <div className="formInner">
          <div className="form-group1">
          <label className="form-label1" placeholder=" ">
            <input className="form-control1" onChange={(e) => handleInput(e)} required name="theme" placeholder=" " type="text"/>
            <p className="labelP1">Theme</p>          
          </label>
          </div>
          <br></br>

          <div>
            <img className="questionPic" src={Question} />
          </div>
          <div className="form-group1">
          <label className="form-label1" placeholder=" ">
            <input className="form-control1" onChange={(e) => handleInput(e)} required name="sideOne" placeholder=" " type="text"/>
            <p className="labelP1">Side One</p>
          </label>
          </div>
          <div>
            <img className="colonPic" src={Colon} />
          </div>
          <div className="form-group1">
          <label className="form-label1" placeholder=" ">
            <input className="form-control1" onChange={(e) => handleInput(e)} required name="sideTwo" placeholder=" " type="text"/>
            <p className="labelP1">Side Two</p>
          </label>
          </div>
        </div>
        <br></br>

          <div className="form-group2">
          <label className="form-label2" placeholder=" ">
            <input className="form-control2" onChange={(e) => handleInput(e)} required name="description" placeholder=" " type="text"/>
            <p className="labelP2">Description</p>
          </label>
          </div>
          <br></br>
          <br></br>

          <div>
            <button className="createThreadBtn" type='submit'>Submit</button>
          </div>
      </form>
    </div>
    
  </>
  )
}
