import { call, put, takeLatest } from 'redux-saga/effects';
import { USER_CREATE_REQUEST } from './types';
import { createUserSuccessed, createUserFailed } from './actions';
import { createUserWithEmailAndPassword } from '../../firebase/';

export function* createUserSaga(action) {
  try {
    const response = yield call(createUserWithEmailAndPassword, ...action.payload);
    yield put(createUserSuccessed(response));
  } catch (error) {
    yield put(createUserFailed(error.message));
  }
}

export function* userSagas() {
  yield takeLatest(USER_CREATE_REQUEST, createUserSaga);
}
