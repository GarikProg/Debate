import { SEND_AUTHENTICATED_FROM_REDUX_TO_SAGA, DATABASE_ERROR_FROM_REDUX_TO_SAGA, REGISTER_EMAIL_ERROR_FROM_REDUX_TO_SAGA, REGISTER_NAME_ERROR_FROM_REDUX_TO_SAGA, LOGIN_PASSWORD_ERROR_FROM_REDUX_TO_SAGA, LOGIN_NAME_EMAIL_ERROR_FROM_REDUX_TO_SAGA, LOGOUT_FROM_REDUX_TO_SAGA } from './actionTypes'

export const reducer = (state, action) => {
  switch (action.type) {
    case SEND_AUTHENTICATED_FROM_REDUX_TO_SAGA:
      return {...state, isAuthorized: true, user: action.user, loginNameEmailError: null, loginPasswordError: null, registerNameError: null, registerEmailError: null, dbError: null };
    case DATABASE_ERROR_FROM_REDUX_TO_SAGA:
      return {...state, dbError: action.error, loginNameEmailError: null, loginPasswordError: null, registerNameError: null, registerEmailError: null};
    case REGISTER_EMAIL_ERROR_FROM_REDUX_TO_SAGA:
      return {...state, registerEmailError: action.error, registerNameError: null, dbError: null };
    case REGISTER_NAME_ERROR_FROM_REDUX_TO_SAGA:
      return {...state, registerNameError: action.error, registerEmailError: null, dbError: null };
    case LOGIN_NAME_EMAIL_ERROR_FROM_REDUX_TO_SAGA:
      return {...state, loginNameEmailError: action.error, loginPasswordError: null, dbError: null };
    case LOGIN_PASSWORD_ERROR_FROM_REDUX_TO_SAGA:
      return {...state, loginPasswordError: action.error, loginNameEmailError: null, dbError: null };
    case LOGOUT_FROM_REDUX_TO_SAGA:
      const defaultValue = { isAuthorized: false, user: { name: null, id: null }, loginNameEmailError: null, loginPasswordError: null, registerNameError: null, registerEmailError: null, dbError: null };
      return defaultValue;
    default:
      return state;
  }
}
