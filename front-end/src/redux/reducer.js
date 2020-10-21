import { SEND_AUTHENTICATED_FROM_SAGA_TO_REDUX, DATABASE_ERROR_FROM_SAGA_TO_REDUX, REGISTER_EMAIL_ERROR_FROM_SAGA_TO_REDUX, REGISTER_NAME_ERROR_FROM_SAGA_TO_REDUX, LOGIN_PASSWORD_ERROR_FROM_SAGA_TO_REDUX, LOGIN_NAME_EMAIL_ERROR_FROM_SAGA_TO_REDUX, LOGOUT_FROM_SAGA_TO_REDUX, LOAD_THREADS_FROM_SAGA_TO_REDUX, LOAD_DEBATES_FROM_SAGA_TO_REDUX, CREATE_NEW_THREAD_FROM_SAGA_TO_REDUX, CREATE_NEW_DEBATE_FROM_SAGA_TO_REDUX } from './actionTypes'

function compare(one, two) {
  let firtsToCompare;
  let secondToCompare;
  if (one.createdAt >= one.updatedAt) {
    firtsToCompare = one.createdAt
  } else {
    firtsToCompare = one.updatedAt
  }
  if (two.createdAt >= two.updatedAt) {
    secondToCompare = two.createdAt
  } else {
    secondToCompare = two.updatedAt
  }
  
  let comparison = 0;
  if (firtsToCompare > secondToCompare) {
    comparison = -1;
  } else if (firtsToCompare < secondToCompare) {
    comparison = 1;
  }

  return comparison;
}

const sorted = (data) => {
  let result = [];
  if (data.length > 4) {
    for (let i = 0; i < 4; i++) {
      result.push(data[i]);
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      result.push(data[i]);
    }
  }
  return result
}


export const reducer = (state, action) => {
  switch (action.type) {
    case SEND_AUTHENTICATED_FROM_SAGA_TO_REDUX:
      return {...state, isAuthorized: true, user: action.user, loginNameEmailError: null, loginPasswordError: null, registerNameError: null, registerEmailError: null, dbError: null };
    case DATABASE_ERROR_FROM_SAGA_TO_REDUX:
      return {...state, dbError: action.error, loginNameEmailError: null, loginPasswordError: null, registerNameError: null, registerEmailError: null};
    case REGISTER_EMAIL_ERROR_FROM_SAGA_TO_REDUX:
      return {...state, registerEmailError: action.error, registerNameError: null, dbError: null };
    case REGISTER_NAME_ERROR_FROM_SAGA_TO_REDUX:
      return {...state, registerNameError: action.error, registerEmailError: null, dbError: null };
    case LOGIN_NAME_EMAIL_ERROR_FROM_SAGA_TO_REDUX:
      return {...state, loginNameEmailError: action.error, loginPasswordError: null, dbError: null };
    case LOGIN_PASSWORD_ERROR_FROM_SAGA_TO_REDUX:
      return {...state, loginPasswordError: action.error, loginNameEmailError: null, dbError: null };
    case LOGOUT_FROM_SAGA_TO_REDUX:
      const defaultValue = { isAuthorized: false, user: { name: null, id: null }, loginNameEmailError: null, loginPasswordError: null, registerNameError: null, registerEmailError: null, dbError: null };
      return defaultValue;
    case LOAD_THREADS_FROM_SAGA_TO_REDUX:
      const threadsClone = action.data.threads.slice()
      threadsClone.sort(compare);
      return {...state, appThreads: action.data.threads, mainThreads: sorted(threadsClone) };
    case LOAD_DEBATES_FROM_SAGA_TO_REDUX:
      const debatesClone = action.data.debates.slice()
      debatesClone.sort(compare);
      return {...state, addDebates: action.data.debates, mainDebates: sorted(debatesClone)}
    case CREATE_NEW_THREAD_FROM_SAGA_TO_REDUX: 
      const addThreadsClone = state.appThreads.slice();
      if (action.data === 'Data base error, plase try again') {
        return {...state}
      } else {
        addThreadsClone.push(action.data);
        return {...state, appThreads: addThreadsClone, mainThreads: sorted(addThreadsClone), successfulThreadCreate: true };
      }
    case CREATE_NEW_DEBATE_FROM_SAGA_TO_REDUX: 
      const addDebatesClone = state.addDebates.slice();
      if (action.data === 'Data base error, plase try again') {
        return {...state}
      } else {
        addThreadsClone.push(action.data);
        return {...state, appDebates: addDebatesClone, mainDebates: sorted(addDebatesClone), successfulDebateCreate: true };
      }
    default:
      return state;
  }
}
