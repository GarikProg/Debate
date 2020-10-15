import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
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
 

function App() {
  return (
    <>
<Router>
    <Header />
  {/* <Link to="/MainPage">Main Page </Link>
  <Link to="/LocalThread">Local Thread </Link>
  <Link to="/GlobalThread">Global Thread </Link>
  <Link to="/Profile">Profile </Link>
  <Link to="/TestChat">Chat Igorya</Link> */}
  <Switch>
    <Route path="/MainPage">
      <MainPage />
    </Route>
    <Route path="/LocalThread">
      <LocalThread />
    </Route>
    <Route path="/GlobalThread">
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
      <Registration />
    </Route>
    <Route path="/Login">
      <Login />
    </Route>
  </Switch>
</Router>
<Footer />
    </>
  );
}

export default App;


