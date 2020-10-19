import { put, takeEvery } from "redux-saga/effects";
import { sendAuthenticatedFromReduxToSaga, dataBaseErrorFromReduxToSaga, registerEmailErrorFromReduxToSaga, registerNameErrorFromReduxToSaga, loginNameEmailErrorFromReduxToSaga, loginPasswordErrorFromReduxToSaga, logoutFromReduxToSaga } from '../actions'
import { CHECK_REGISTER, CHECK_SIGN_IN, LOADING_CHECK, LOGOUT } from '../actionTypes'

function* checkForSignIn(action) {
  const { nameEmail, password } = action.data;
  try {
    const responce = yield fetch('http://localhost:3001/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nameEmail,
        password,
      }),
      mode: 'cors'
    });
    const data = yield responce.json();
    if (data.authenticated) {
      yield put(sendAuthenticatedFromReduxToSaga(data.user));
    } else if (data.err === 'Data base error, plase try again') {
      yield put(dataBaseErrorFromReduxToSaga(data.err));
    } else if (data.err === 'Invalid password') {
      yield put(loginPasswordErrorFromReduxToSaga(data.err))
    } else if (data.err === 'No such user') {
      yield put(loginNameEmailErrorFromReduxToSaga(data.err))
    }
  } catch (error) {
    console.error('Error while Sign In fetch', error)
  }
}

function* checkForRegister(action) {
  const { name, email, password } = action.data
  try {
    const responce = yield fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      mode: 'cors'
    });
    const data = yield responce.json();
    console.log(data)
    if (data.authenticated) {
      yield put(sendAuthenticatedFromReduxToSaga(data.user));
    } else if (data.err === 'Data base error, plase try again') {
      yield put(dataBaseErrorFromReduxToSaga(data.err));
    } else if (data.err === 'This email is already taken') {
      yield put(registerEmailErrorFromReduxToSaga(data.err))
    } else if (data.err === 'This name is already taken') {
      yield put(registerNameErrorFromReduxToSaga(data.err))
    }
  } catch (error) {
    console.error('Error while Sign Up fetch', error)
  }
}

function* loadingCheck() {
  try {
    const responce = yield fetch('http://localhost:3001/loading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      mode: 'cors',
    });
    const data = yield responce.json()
    if (data.authenticated) {
      yield put(sendAuthenticatedFromReduxToSaga(data.user));
    }
  } catch (error) {
    console.log('Error while Loading fetch', error)
  }
};

function* logOut() {
  try {
    const responce = yield fetch('http://localhost:3001/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      mode: 'cors',
    });
    const data = yield responce.json()
    if (!data.authenticated) {
      yield put(logoutFromReduxToSaga())
    } else if (data.err) {
      console.log('Server error', data.err)
    }
  } catch (error) {
    console.log('Error while Loggining Out fetch', error)
  }
}


export default function* watcher() {
  yield takeEvery(CHECK_REGISTER, checkForRegister);
  yield takeEvery(CHECK_SIGN_IN, checkForSignIn);
  yield takeEvery(LOADING_CHECK, loadingCheck)
  yield takeEvery(LOGOUT, logOut)
}
