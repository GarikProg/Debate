import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import {composeWithDevTools} from 'redux-devtools-extension';

const preloadedState = window.localStorage.getItem('state') || '{"isAuthenticated: false"}';
const store = createStore(
  (state, action) => {
    switch(action.type){
      case "AUTHENTICATED_SUCCESSFULLY":
        return {
          isAuthenticated: true
        };
      case "LOGOUT":
        return {
          isAuthenticated: false
        }; 
      default:
        return state;
    }

  },
  preloadedState,
  composeWithDevTools()

);

store.subscribe(()=>{
  const state = store.getState();
  window.localStorage.setItem('state', JSON.stringify(state))
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
