import { put, fork, take, call, takeLatest, takeEvery } from "redux-saga/effects";
import { sendAuthenticatedFromReduxToSaga, dataBaseErrorFromReduxToSaga, registerEmailErrorFromReduxToSaga, registerNameErrorFromReduxToSaga, loginNameEmailErrorFromReduxToSaga, loginPasswordErrorFromReduxToSaga } from '../actions'
import { CHECK_REGISTER, CHECK_SIGN_IN } from '../actionTypes'

function* checkForSignIn(action) {
  const { nameEmail, password } = action.data;
  try {
    const responce = yield fetch('/signin', {
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
    console.log(data)
    if (data.authenticated) {
      //sucsess
      yield put(sendAuthenticatedFromReduxToSaga(data.user));
    } else if (data.err === 'Data base error, plase try again') {
      //db error
      yield put(dataBaseErrorFromReduxToSaga(data.err));
    } else if (data.err === 'Invalid password') {
      // password err
      yield put(loginPasswordErrorFromReduxToSaga(data.err))
    } else if (data.err === 'No such user') {
      // user err
      yield put(loginNameEmailErrorFromReduxToSaga(data.err))
    }
  } catch (error) {
    console.error(error)
  }
}

function* checkForRegister(action) {
  const { name, email, password } = action.data
  try {
    const responce = yield fetch('/signup', {
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
    if (data.authenticated) {
      //sucsess
      yield put(sendAuthenticatedFromReduxToSaga(data.user));
    } else if (data.err === 'Data base error, plase try again') {
      //db error
      yield put(dataBaseErrorFromReduxToSaga(data.err));
    } else if (data.err === 'This email is already taken') {
      // email err
      yield put(registerEmailErrorFromReduxToSaga(data.err))
    } else if (data.err === 'This name is already taken') {
      // name err
      yield put(registerNameErrorFromReduxToSaga(data.err))
    }
  } catch (error) {
    console.error(error)
  }
}

export default function* watcher() {
  yield takeEvery(CHECK_REGISTER, checkForRegister)
  yield takeEvery(CHECK_SIGN_IN, checkForSignIn)
}
