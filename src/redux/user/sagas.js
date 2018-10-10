import { call, put, takeLatest } from 'redux-saga/effects';
import {
  USER_CREATE_REQUEST,
  USER_LOGIN_REQUEST,
  USER_LOGOUT_REQUEST,
  USER_UPDATE_REQUEST
} from './types';
import {
  userCreateSuccessed,
  userCreateFailed,
  userLoginSuccessed,
  userLoginFailed,
  userLogoutSuccessed,
  userLogoutFailed,
  userUpdateSuccessed,
  userUpdateFailed,
} from './actions';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from '../../firebase/';

export function* userCreateSaga(action) {
  try {
    const createResponse = yield call(createUserWithEmailAndPassword, ...action.payload);
    yield put(userCreateSuccessed(createResponse));
  } catch (error) {
    yield put(userCreateFailed(error.message));
  }
}

export function* userLoginSaga(action) {
  try {
    const loginResponse = yield call(signInWithEmailAndPassword, ...action.payload);
    yield put(userLoginSuccessed(loginResponse));
  } catch (error) {
    yield put(userLoginFailed(error.message));
  }
}

export function* userLogoutSaga() {
  try {
    const logoutResponse = yield call(signOut);
    yield put(userLogoutSuccessed(logoutResponse));
  } catch (error) {
    yield put(userLogoutFailed(error.message));
  }
}

export function* userUpdateSaga(action) {
  try {
    const updateResponse = yield call(updateProfile, ...action.payload);
    yield put(userUpdateSuccessed(updateResponse));
  } catch (error) {
    yield put(userUpdateFailed(error.message));
  }
}

export function* userSagas() {
  yield takeLatest(USER_CREATE_REQUEST, userCreateSaga);
  yield takeLatest(USER_LOGIN_REQUEST, userLoginSaga);
  yield takeLatest(USER_LOGOUT_REQUEST, userLogoutSaga);
  yield takeLatest(USER_UPDATE_REQUEST, userUpdateSaga);
}
