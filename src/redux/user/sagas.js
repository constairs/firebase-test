import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  USER_CREATE_REQUEST,
  USER_LOGIN_REQUEST,
  USER_LOGOUT_REQUEST,
  USER_UPDATE_REQUEST,
  USER_DELETE_REQUEST,
  CHANGE_EMAIL_REQUEST,
  SEND_VERIFICATION_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST
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
  userDeleteSuccessed,
  userDeleteFailed,
  changeEmailSuccessed,
  changeEmailFailed,
  sendVerificationSuccessed,
  sendVerificationFailed,
  changePasswordSuccessed,
  changePasswordFailed,
  resetPasswordSuccessed,
  resetPasswordFailed
} from './actions';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  deleteProfile,
  updateEmail,
  sendVerification,
  updatePassword,
  resetPassword
} from '../../firebase/userFuctions';

export function* userCreateSaga(action) {
  try {
    const createResponse = yield call(createUserWithEmailAndPassword, ...action.payload);
    yield put(userCreateSuccessed(createResponse));
    yield put(push('/profile'));
  } catch (error) {
    yield put(userCreateFailed(error.message));
  }
}

export function* userLoginSaga(action) {
  try {
    const loginResponse = yield call(signInWithEmailAndPassword, ...action.payload);
    yield put(userLoginSuccessed(loginResponse));
    yield put(push('/profile'));
  } catch (error) {
    yield put(userLoginFailed(error.message));
  }
}

export function* userLogoutSaga() {
  try {
    const logoutResponse = yield call(signOut);
    yield put(userLogoutSuccessed(logoutResponse));
    yield put(push('/login'));
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

export function* userDeleteSaga() {
  try {
    const deleteResponse = yield call(deleteProfile);
    yield put(userDeleteSuccessed(deleteResponse));
    yield put(push('/auth'));
  } catch (error) {
    yield put(userDeleteFailed(error));
  }
}

export function* changeEmailSaga(action) {
  try {
    const changeResponse = yield call(updateEmail, action.payload);
    yield put(changeEmailSuccessed(changeResponse));
  } catch (error) {
    yield put(changeEmailFailed(error));
  }
}

export function* sendVerificationSaga(action) {
  try {
    const sendVerficationResponse = yield call(sendVerification, action.payload);
    yield put(sendVerificationSuccessed(sendVerficationResponse));
  } catch (error) {
    yield put(sendVerificationFailed(error));
  }
}

export function* changePasswordSaga(action) {
  try {
    const changeResponse = yield call(updatePassword, action.payload);
    yield put(changePasswordSuccessed(changeResponse));
  } catch (error) {
    yield put(changePasswordFailed(error));
  }
}

export function* resetPasswordSaga(action) {
  try {
    const resetResponse = yield call(resetPassword, action.payload);
    yield put(resetPasswordSuccessed(resetResponse));
  } catch (error) {
    yield put(resetPasswordFailed(error));
  }
}

export function* userSagas() {
  yield takeLatest(USER_CREATE_REQUEST, userCreateSaga);
  yield takeLatest(USER_LOGIN_REQUEST, userLoginSaga);
  yield takeLatest(USER_LOGOUT_REQUEST, userLogoutSaga);
  yield takeLatest(USER_UPDATE_REQUEST, userUpdateSaga);
  yield takeLatest(USER_DELETE_REQUEST, userDeleteSaga);
  yield takeLatest(CHANGE_EMAIL_REQUEST, changeEmailSaga);
  yield takeLatest(SEND_VERIFICATION_REQUEST, sendVerificationSaga);
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePasswordSaga);
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordSaga);
}
