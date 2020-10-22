import { SEND_AUTHENTICATED_FROM_SAGA_TO_REDUX, DATABASE_ERROR_FROM_SAGA_TO_REDUX, REGISTER_EMAIL_ERROR_FROM_SAGA_TO_REDUX, REGISTER_NAME_ERROR_FROM_SAGA_TO_REDUX, LOGIN_PASSWORD_ERROR_FROM_SAGA_TO_REDUX, LOGIN_NAME_EMAIL_ERROR_FROM_SAGA_TO_REDUX, LOGOUT_FROM_SAGA_TO_REDUX, LOAD_THREADS_FROM_SAGA_TO_REDUX, LOAD_DEBATES_FROM_SAGA_TO_REDUX, CREATE_NEW_THREAD_FROM_SAGA_TO_REDUX, CREATE_NEW_DEBATE_FROM_SAGA_TO_REDUX, CHECK_CREATED_THREAD, ADD_LIKE_TO_USER_IN_REDUX, ADD_COMMENT_TO_USER_IN_REDUX, CHANGE_COMMET_WRITING_PERMISSON, SET_COMMENT_WRITING_COOLDOWN } from './actionTypes'

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
  if (data.length > 3) {
    for (let i = 0; i < 3; i++) {
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
      return {...state, isAuthorized: false, user: {}, loginNameEmailError: null, loginPasswordError: null, registerNameError: null, registerEmailError: null, dbError: null };
    case LOAD_THREADS_FROM_SAGA_TO_REDUX:
      const threadsClone = action.data.threads.slice()
      threadsClone.sort(compare);
      return {...state, appThreads: action.data.threads, mainThreads: sorted(threadsClone) };
    case LOAD_DEBATES_FROM_SAGA_TO_REDUX:
      const debatesClone = action.data.debates.slice()
      debatesClone.sort(compare);
      return {...state, appDebates: action.data.debates, mainDebates: sorted(debatesClone)}
    case CREATE_NEW_THREAD_FROM_SAGA_TO_REDUX: 
      const addThreadsClone = state.appThreads.slice();
      if (action.data === 'Data base error, plase try again') {
        return {...state}
      } else {
        const userThreads = state.user.threads;
        userThreads.push(action.data)
        addThreadsClone.push(action.data);
        return {...state, user: { ...state.user, threads: userThreads }, appThreads: addThreadsClone, mainThreads: sorted(addThreadsClone.sort(compare)), successfulThreadCreate: true };
      };
    case CHECK_CREATED_THREAD: 
      return {...state, successfulThreadCreate: false };
    case CREATE_NEW_DEBATE_FROM_SAGA_TO_REDUX: 
      const addDebatesClone = state.addDebates.slice();
      if (action.data === 'Data base error, plase try again') {
        return {...state}
      } else {
        addThreadsClone.push(action.data);
        return {...state, appDebates: addDebatesClone, mainDebates: sorted(addDebatesClone), successfulDebateCreate: true };
      };
    case ADD_LIKE_TO_USER_IN_REDUX:
      const userLikesClone = state.user.likes.slice();
      userLikesClone.push(action.data)
      return { ...state, user: { ...state.user, likes: userLikesClone } };
    case ADD_COMMENT_TO_USER_IN_REDUX:
      const userCommetsClone = state.user.comments.slice();
      userCommetsClone.push(action.data);
      return { ...state, user: { ...state.user, comments: userCommetsClone } };
    case CHANGE_COMMET_WRITING_PERMISSON: 
      return { ...state, canWriteComment: !state.canWriteComment };
    case SET_COMMENT_WRITING_COOLDOWN:
      return { ...state, commentWritingTimeout: action.data };
    default:
      return state;
  }
}
