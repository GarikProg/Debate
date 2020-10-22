import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { loadingSessionCheck, loadThreads, loadDebates, changeCommetWritingPermission, setCommetWritingCooldown } from "./redux/actions";
import MainPage from './components/MainPage/MainPage'
import Debate from './components/Debate/Debate'
import GlobalThread from './components/GlobalThread/globalThread'
import Profile from './components/Profile/Profile'
import TestChat from './components/Chat/TestChat'
import About from './components/About/About'
import Header from './components/Header/header'
import Footer from './components/Footer/footer'
import Logout from './components/Logout/Logout';
import CreateThread from './components/CreateThread/CreateThread';
import GlobalThreadAll from './components/GlobalThreadAll/GlobalThreadAll'
import CreateDebate from './components/CreateDebate/CreateDebate'
import Auth from './components/Auth/Auth';
import './App.scss'

function App() {

  const isAuthorized = useSelector(state => state.isAuthorized);
  const successfulThreadCreate = useSelector(state => state.successfulThreadCreate);

  const canWriteComment = useSelector(state => state.canWriteComment);
  const coolDown = useSelector(state => state.commentWritingTimeout);

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(loadingSessionCheck());
    dispatch(loadThreads());
    dispatch(loadDebates());
  }, [])

  useEffect(() => {
    if (!canWriteComment) {
      let cloneCooldown = coolDown;
      const interval = setInterval(() => {
        cloneCooldown -= 1;
        dispatch(setCommetWritingCooldown(cloneCooldown));
        if (cloneCooldown === 0) {
          clearInterval(interval);
          dispatch(changeCommetWritingPermission());
        }
      }, 1000);
    }
  }, [canWriteComment])
  
  return (
    <>
<Router>
    <Header />
    <div className="container">
      <div className="wrapper">
        <div className="home">
  <Switch>
    <Route path="/Home">
      <MainPage />
    </Route>
    <Route exact path="/Auth">
      { isAuthorized ? <Redirect to='/Home' /> : <Auth /> }
    </Route>
    <Route exact path="/Debate/:id">
      <Debate />
    </Route>    
    <Route exact path="/GlobalThread/">
      <GlobalThreadAll />
    </Route>
    <Route exact path="/GlobalThread/:id">
      <GlobalThread />
    </Route>
    <Route exact path="/Profile">
      <Profile />
    </Route>
    <Route path="/TestChat">
      <TestChat />
    </Route>
    <Route path="/About">
      <About />
    </Route>
    <Route path="/Logout">
      <Logout />
    </Route>
    <Route path="/createThread">
      { successfulThreadCreate ? <Redirect to='/Home'/> : <CreateThread /> }
    </Route>
    <Route path="/createDebate">
      <CreateDebate />
    </Route>
  </Switch>
      </div>
    </div>
  </div>
</Router>
    </>
  );
}

export default App;


