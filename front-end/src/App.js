import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import MainPage from '../src/components/MainPage'
import LocalThread from '../src/components/localThread'
import GlobalThread from '../src/components/globalThread'
import Profile from '../src/components/Profile'
import TestChat from '../src/components/TestChat'

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
    <Route path="/LocalThread">
      <LocalThread />
    </Route>
    <Route path="/GlobalThread">
      <GlobalThread />
    </Route>
    <Route path="/Profile">
      <Profile />
    </Route>
    <Route path="/TestChat">
      <TestChat />
    </Route>
  </Switch>
</Router>
    </>
  );
}

export default App;


