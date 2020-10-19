import { CHECK_SIGN_IN, SEND_AUTHENTICATED_FROM_REDUX_TO_SAGA, CHECK_REGISTER, DATABASE_ERROR_FROM_REDUX_TO_SAGA, REGISTER_EMAIL_ERROR_FROM_REDUX_TO_SAGA, REGISTER_NAME_ERROR_FROM_REDUX_TO_SAGA, LOGIN_PASSWORD_ERROR_FROM_REDUX_TO_SAGA, LOGIN_NAME_EMAIL_ERROR_FROM_REDUX_TO_SAGA, LOADING_CHECK, CLEAR_REDUX_ERRORS, LOGOUT, LOGOUT_FROM_REDUX_TO_SAGA } from './actionTypes'

const checkSignIn = (data) => ({ type: CHECK_SIGN_IN, data });
const checkRegister = (data) => ({ type: CHECK_REGISTER, data });
const loadingCheck = () => ({ type: LOADING_CHECK });

const clearRuduxErrors = () => ({ type: CLEAR_REDUX_ERRORS });

const logout = () => ({ type: LOGOUT });
const logoutFromReduxToSaga = () => ({ type: LOGOUT_FROM_REDUX_TO_SAGA })

const sendAuthenticatedFromReduxToSaga = (user) => ({ type: SEND_AUTHENTICATED_FROM_REDUX_TO_SAGA, user})

const dataBaseErrorFromReduxToSaga = (error) => ({ type: DATABASE_ERROR_FROM_REDUX_TO_SAGA, error });

const registerEmailErrorFromReduxToSaga = (error) => ({ type: REGISTER_EMAIL_ERROR_FROM_REDUX_TO_SAGA, error });
const registerNameErrorFromReduxToSaga = (error) => ({ type: REGISTER_NAME_ERROR_FROM_REDUX_TO_SAGA, error});

const loginNameEmailErrorFromReduxToSaga = (error) => ({ type: LOGIN_NAME_EMAIL_ERROR_FROM_REDUX_TO_SAGA, error });
const loginPasswordErrorFromReduxToSaga = (error) => ({ type: LOGIN_PASSWORD_ERROR_FROM_REDUX_TO_SAGA, error });

export {
  checkSignIn,
  sendAuthenticatedFromReduxToSaga,
  checkRegister,
  dataBaseErrorFromReduxToSaga,
  registerEmailErrorFromReduxToSaga,
  registerNameErrorFromReduxToSaga,
  loginNameEmailErrorFromReduxToSaga,
  loginPasswordErrorFromReduxToSaga,
  loadingCheck,
  logout,
  logoutFromReduxToSaga
}
