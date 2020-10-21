import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from "react-router-dom"
import Question from "../../images/quest2.png"
import Colon from "../../images/colon2.png"
import { createNewThread } from '../../redux/actions';
import './createThread.scss';
import GlobalThread from '../../components/GlobalThread/globalThread'

export default function CreateThread() {

  const creatorRedux = useSelector(state => state.user.id);


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
      <form className="form" onSubmit={(e) => {
        e.preventDefault()
        dispatch(createNewThread(formData))
      }}>
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
          <div className="inputTheme">
            <input className="inputTheme2" onChange={(e) => handleInput(e)} required name="theme" type="text"/>
          </div>
          <div>
            <img className="questionPic" src={Question} />
          </div>
          <div className="inputSideOne">
            <input className="inputTheme3" onChange={(e) => handleInput(e)} required name="sideOne" placeholder="sideOne" type="text"/>
          </div>
          <div>
            <img className="colonPic" src={Colon} />
          </div>
          <div className="inputSideTwo">
            <input className="inputTheme4" onChange={(e) => handleInput(e)} required name="sideTwo" placeholder="sideTwo" type="text"/>
          </div>
        </div>
        <div className="secondContainer">
          <div className="description">
            <input className="descriptionInner" onChange={(e) => handleInput(e)} required name="description" placeholder="description" type="text"/>
          </div>
          <div>
            <button type='submit'>sumbmit</button>
          </div>
        </div>
      </form>
    </div>
    
  </>
  )
}
