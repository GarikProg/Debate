import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './redux/reducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './redux/saga/rootSaga'

const sagaMidlleware = createSagaMiddleware();

const defaultValue = { isAuthorized: false, user: { name: null, id: null }, loginNameEmailError: null, loginPasswordError: null, registerNameError: null, registerEmailError: null, dbError: null };

const store = createStore(reducer, defaultValue, composeWithDevTools(applyMiddleware(sagaMidlleware)));

sagaMidlleware.run(rootSaga);



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
