import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import MainPage from '../src/components/MainPage'
import LocalThread from './components/LocalThread'
import GlobalThread from './components/GlobalThread'
import Profile from '../src/components/Profile'

function App() {
  return (
    <>
<Router>
  <Link to="/MainPage">Main Page</Link>
  <Link to="/LocalThread">Local Thread </Link>
  <Link to="/GlobalThread">Global Thread </Link>
  <Link to="/Profile">Profile </Link>
  <Link to="/TestChat">Chat Igorya</Link>
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
  </Switch>
</Router>
    </>
  );
}

export default App;


