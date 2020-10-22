import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logout } from '../../redux/actions';
import SecondLayer from '../secondLayer/secondLayer'

const Header = ({ history }) => {

  const [state, setState] = useState({
    initial: false,
    clicked: null,
    menuName: "Menu"
  })

  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    history.listen(() => {
      setState({clicked: false, menuName:"Menu"})
    })
  })

  const handleMenu = () => {
    disableMenu();
    if(state.initial === false) {
      setState({
        initial: null,
        clicked: true,
        menuName: "Close"
      })         
      } else if (state.clicked === true) {
        setState({
          clicked: !state.clicked,
          menuName: "Menu"
        })
      } else if (state.clicked === false) {
        setState({
          clicked: !state.clicked,
          menuName: "Close"
        })
      }
    }
  
  const disableMenu = () => {
    setDisabled(!disabled)
    setTimeout(() => {
      setDisabled(false)
    }, 1200
    )
  }
  const dispatch = useDispatch();


  const isAuthorized = useSelector(state => state.isAuthorized);
  
  return (
    <header>
      <div className="container">
        <div className="wrapper">
          <div className="inner-header">
            <div className="logo">
            <button className="mainPageStyle">
               <Link className="mainLinkStyle" to="/Home">
                  <h1 className="neon" data-text="U">DE<span className="flicker-slow">B</span>A<span className="flicker-fast">T</span>ES</h1></Link>
          </button>
            </div>
            <div className="menu">
              <button className="profileStyle" disabled={disabled} onClick={handleMenu}>
              <div className="profileLinkStyle">
                Menu
                </div>
              </button>
              {!isAuthorized && <button className="profileStyle"><Link className="profileLinkStyle" to="/Auth">Authentication </Link></button>}
              <button className="profileStyle">
              {isAuthorized && <Link to="/Home" className="profileLinkStyle" onClick={() => dispatch(logout())}>Logout </Link>}
             </button>
             {/* <button className="profileStyle">
              {isAuthorized && <Link className="profileLinkStyle" to="/Profile">Profile </Link>}
             </button> */}
            </div>
          </div>
        </div>
      </div>
      <SecondLayer state={state}/>
    </header>
  )
}
export default withRouter(Header)
