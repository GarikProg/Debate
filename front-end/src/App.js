import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { loadingCheck } from "./redux/actions";
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
import Secret from './components/Secret/Secret';
import Logout from './components/Logout/Logout';

function App() {

  const isAuthorized = useSelector(state => state.isAuthorized);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadingCheck())
  }, [])
  
  return (
    <>
<Router>
    <Header />
  <Switch>
    <Route path="/MainPage">
      <MainPage />
    </Route>
    <Route path="/LocalThread/:id">
      <LocalThread />
    </Route>
    <Route path="/GlobalThread/:id">
      <GlobalThread />
    </Route>
    <Route path="/Profile">
      <Profile />

    </Route>
    <PrivateRoute path="/Secret">
      <Secret />
    </PrivateRoute>
    <Route path="/TestChat">
      <TestChat />
    </Route>
    <Route path="/About">
      <About />
    </Route>
    <Route path="/Registration">
    { isAuthorized ? <Redirect to='MainPage'/> : <Registration /> }
    </Route>
    <Route path="/Login">
      { isAuthorized ? <Redirect to='MainPage'/> : <Login /> }
    </Route>
    <Route path="/Logout">
      <Logout />
    </Route>

  </Switch>
</Router>
<Footer />
    </>
  );
}

export default App;


