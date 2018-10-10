import { assoc, assocPath, pipe } from 'ramda';

import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

export const initState = {
  userFetching: false,
  authData: '',
  email: '',
  photoURL: '',
  displayName: '',
  logged: false,
  notification: {
    error: '',
    success: '',
    show: false
  }
};

const userCreateRequest = () => assoc('userFetching', true);
const userCreateSuccessed = response => pipe(
  assoc('userFetching', false),
  assoc('authData', response.user.email),
  assoc('logged', true),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'success'], `${response.user.email} успешно зарегистрирован`),
);
const userCreateFailed = error => pipe(
  assoc('userFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);

const userLoginRequest = () => assoc('userFetching', true);
const userLoginSuccessed = response => pipe(
  assoc('userFetching', false),
  assoc('authData', response.user.email),
  assoc('logged', true),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'success'], `${response.user.email} успешно вошел`),
);
const userLoginFailed = error => pipe(
  assoc('userFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);

const userLogoutRequest = () => assoc('userFetching', true);
const userLogoutSuccessed = logoutResponse => pipe(
  assoc('userFetching', false),
  assoc('authData', ''),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'success'], logoutResponse),
  assoc('logged', false),
);
const userLogoutFailed = error => pipe(
  assoc('userFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);

const userUpdateRequest = () => assoc('userFetching', true);
const userUpdateSuccessed = updateResponse => pipe(
  assoc('userFetching', false),
  assoc('displayName', updateResponse.profileName),
  assoc('photoURL', updateResponse.profileImg),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'success'], 'Профиль успешно обновлен'),
);
const userUpdateFailed = error => pipe(
  assoc('userFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);

const userCloseNotification = () => pipe(
  assocPath(['notification', 'show'], false),
  assocPath(['notification', 'error'], ''),
  assocPath(['notification', 'success'], ''),
);


const changeEmailRequest = () => assoc('userFetching', true);
const changeEmailSuccessed = changeEmailResponse => pipe(
  assoc('userFetching', false),
  assoc('email', changeEmailResponse),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'success'], 'Email успешно обновлен'),
);
const changeEmailFailed = error => pipe(
  assoc('userFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);

const changeVerificationRequest = () => assoc('userFetching', true);
const changeVerificationSuccessed = changeEmailResponse => pipe(
  assoc('userFetching', false),
  assoc('authData', changeEmailResponse),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'success'], 'Email успешно обновлен'),
);
const changeVerificationFailed = error => pipe(
  assoc('userFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);


const changePasswordRequest = () => assoc('userFetching', true);
const changePasswordSuccessed = changeEmailResponse => pipe(
  assoc('userFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'success'], changeEmailResponse),
);
const changePasswordFailed = error => pipe(
  assoc('userFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);

const handlers = {
  [TYPES.USER_CREATE_REQUEST]: userCreateRequest,
  [TYPES.USER_CREATE_SUCCESSED]: userCreateSuccessed,
  [TYPES.USER_CREATE_FAILED]: userCreateFailed,

  [TYPES.USER_LOGIN_REQUEST]: userLoginRequest,
  [TYPES.USER_LOGIN_SUCCESSED]: userLoginSuccessed,
  [TYPES.USER_LOGIN_FAILED]: userLoginFailed,

  [TYPES.USER_LOGOUT_REQUEST]: userLogoutRequest,
  [TYPES.USER_LOGOUT_SUCCESSED]: userLogoutSuccessed,
  [TYPES.USER_LOGOUT_FAILED]: userLogoutFailed,

  [TYPES.USER_UPDATE_REQUEST]: userUpdateRequest,
  [TYPES.USER_UPDATE_SUCCESSED]: userUpdateSuccessed,
  [TYPES.USER_UPDATE_FAILED]: userUpdateFailed,

  [TYPES.CHANGE_EMAIL_REQUEST]: changeEmailRequest,
  [TYPES.CHANGE_EMAIL_SUCCESSED]: changeEmailSuccessed,
  [TYPES.CHANGE_EMAIL_FAILED]: changeEmailFailed,

  [TYPES.CHANGE_VERIFICATION_REQUEST]: changeVerificationRequest,
  [TYPES.CHANGE_VERIFICATION_SUCCESSED]: changeVerificationSuccessed,
  [TYPES.CHANGE_VERIFICATION_FAILED]: changeVerificationFailed,

  [TYPES.CHANGE_PASSWORD_REQUEST]: changePasswordRequest,
  [TYPES.CHANGE_PASSWORD_SUCCESSED]: changePasswordSuccessed,
  [TYPES.CHANGE_PASSWORD_FAILED]: changePasswordFailed,

  [TYPES.USER_CLOSE_NOTIFICATION]: userCloseNotification,
};

export const user = createReducer(initState, handlers);
