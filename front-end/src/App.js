import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { loadingSessionCheck, loadThreads, loadDebates } from "./redux/actions";
import MainPage from './components/MainPage/MainPage'
import LocalThread from './components/LocalThread/localThread'
import GlobalThread from './components/GlobalThread/globalThread'
import Profile from './components/Profile/Profile'
import TestChat from './components/Chat/TestChat'
import About from './components/About/About'
import Header from './components/Header/header'
import Footer from './components/Footer/footer'
import Logout from './components/Logout/Logout';
import CreateThread from './components/CreateThread/CreateThread';
import GlobalThreadAll from './components/GlobalThreadAll/GlobalThreadAll'
import GlobalDebateAll from '../src/components/GlobalDebateAll/GlobalDebateAll'
import CreateDebate from './components/CreateDebate/CreateDebate'
import Auth from './components/Auth/Auth';
import './App.scss'

function App() {

  const isAuthorized = useSelector(state => state.isAuthorized);
  const successfulThreadCreate = useSelector(state => state.successfulThreadCreate);

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(loadingSessionCheck());
    dispatch(loadThreads());
    dispatch(loadDebates());
  }, [])
  
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
    <Route exact path="/LocalThread/:id">
      <LocalThread />
    </Route>
    <Route exact path="/LocalThread/">
      <GlobalDebateAll />
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
<Footer />
    </>
  );
}

export default App;


