import { SEND_AUTHENTICATED_FROM_REDUX_TO_SAGA, DATABASE_ERROR_FROM_REDUX_TO_SAGA, REGISTER_EMAIL_ERROR_FROM_REDUX_TO_SAGA, REGISTER_NAME_ERROR_FROM_REDUX_TO_SAGA, LOGIN_PASSWORD_ERROR_FROM_REDUX_TO_SAGA, LOGIN_NAME_EMAIL_ERROR_FROM_REDUX_TO_SAGA } from './actionTypes'

export const reducer = (state, action) => {
  switch (action.type) {
    case SEND_AUTHENTICATED_FROM_REDUX_TO_SAGA:
      console.log('good')
      return {...state, isAuthorized: true, user: action.user, loginNameEmailError: null, loginPasswordError: null, registerNameError: null, registerEmailError: null, dbError: null };
    case DATABASE_ERROR_FROM_REDUX_TO_SAGA:
      return {...state, dbError: action.error, loginNameEmailError: null, loginPasswordError: null, registerNameError: null, registerEmailError: null};
    case REGISTER_EMAIL_ERROR_FROM_REDUX_TO_SAGA:
      return {...state, registerEmailError: action.error, registerNameError: null, dbError: null };
    case REGISTER_NAME_ERROR_FROM_REDUX_TO_SAGA:
      return {...state, registerNameError: action.error, registerNameError: null, dbError: null };
    case LOGIN_NAME_EMAIL_ERROR_FROM_REDUX_TO_SAGA:
      console.log('name')
      return {...state, loginNameEmailError: action.error, loginPasswordError: null, dbError: null };
    case LOGIN_PASSWORD_ERROR_FROM_REDUX_TO_SAGA:
      console.log('password')
      return {...state, loginPasswordError: action.error, loginNameEmailError: null, dbError: null };
    default:
      return state;
  }
}
