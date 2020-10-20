import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import Registration from './components/Registration/Registration'
import Login from './components/Login/Login'
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Logout from './components/Logout/Logout';
import CreateThread from './components/CreateThread/CreateThread';
import GlobalThreadAll from './components/GlobalThreadAll/GlobalThreadAll'
import GlobalDebateAll from '../src/components/GlobalDebateAll/GlobalDebateAll'
import CreateDebate from './components/CreateDebate/CreateDebate'
import Auth from './components/Auth/Auth';

function App() {

  const isAuthorized = useSelector(state => state.isAuthorized);

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
  <Switch>
    <Route path="/Home">
      <MainPage />
    </Route>
    <Route exact path="/Auth">
      <Auth />
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
    {/* <Route path="/Registration">
      {isAuthorized ? <Redirect to='/Home'/> : <Registration />}
    </Route> */}
    <Route path="/Logout">
      <Logout />
    </Route>
    <Route path="/createThread">
      <CreateThread />
    </Route>
    <Route path="/createDebate">
      <CreateDebate />
    </Route>
  </Switch>
</Router>
<Footer />
    </>
  );
}

export default App;


