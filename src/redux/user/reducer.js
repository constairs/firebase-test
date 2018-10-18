import { assoc, assocPath, pipe, lensProp, values, set } from 'ramda';

import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

export const initState = {
  userFetching: false,
  email: '',
  photoURL: '',
  displayName: '',
  username: '',
  logged: false,
  notification: {
    error: '',
    success: '',
    show: false
  },
  users: [],
};

const usersLens = lensProp('users');

const fetchUsersRequest = () => assoc('userFetching', true);

const fetchUsersSuccessed = fetchResponse => pipe(
  assoc('userFetching', false),
  set(usersLens, values(fetchResponse)),
);

const fetchUsersFailed = error => pipe(
  assoc('userFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);

const userCreateRequest = () => assoc('userFetching', true);
const userCreateSuccessed = response => pipe(
  assoc('userFetching', false),
  assoc('email', response.user.email),
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
  assoc('logged', true),
  assoc('email', response.user.email),
  assoc('photoURL', response.user.photoURL),
  assoc('displayName', response.user.displayName),
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
  assoc('email', ''),
  assoc('photoURL', ''),
  assoc('displayName', ''),
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

const userDeleteRequest = () => assoc('userFetching', true);
const userDeleteSuccessed = deleteResponse => pipe(
  assoc('userFetching', false),
  assoc('email', ''),
  assoc('photoURL', ''),
  assoc('displayName', ''),
  assoc('logged', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'success'], deleteResponse),
);
const userDeleteFailed = error => pipe(
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

const sendVerificationRequest = () => assoc('userFetching', true);
const sendVerificationSuccessed = sendVerficationResponse => pipe(
  assoc('userFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'success'], sendVerficationResponse),
);
const sendVerificationFailed = error => pipe(
  assoc('userFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);


const resetPasswordRequest = () => assoc('userFetching', true);
const resetPasswordSuccessed = resetPasswordResponse => pipe(
  assoc('userFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'success'], resetPasswordResponse),
);
const resetPasswordFailed = error => pipe(
  assoc('userFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);


const changePasswordRequest = () => assoc('userFetching', true);
const changePasswordSuccessed = changePasswordResponse => pipe(
  assoc('userFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'success'], changePasswordResponse),
);
const changePasswordFailed = error => pipe(
  assoc('userFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);

const handlers = {
  [TYPES.FETCH_USERS_REQUEST]: fetchUsersRequest,
  [TYPES.FETCH_USERS_SUCCESSED]: fetchUsersSuccessed,
  [TYPES.FETCH_USERS_FAILED]: fetchUsersFailed,


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

  [TYPES.USER_DELETE_REQUEST]: userDeleteRequest,
  [TYPES.USER_DELETE_SUCCESSED]: userDeleteSuccessed,
  [TYPES.USER_DELETE_FAILED]: userDeleteFailed,

  [TYPES.CHANGE_EMAIL_REQUEST]: changeEmailRequest,
  [TYPES.CHANGE_EMAIL_SUCCESSED]: changeEmailSuccessed,
  [TYPES.CHANGE_EMAIL_FAILED]: changeEmailFailed,

  [TYPES.SEND_VERIFICATION_REQUEST]: sendVerificationRequest,
  [TYPES.SEND_VERIFICATION_SUCCESSED]: sendVerificationSuccessed,
  [TYPES.SEND_VERIFICATION_FAILED]: sendVerificationFailed,

  [TYPES.CHANGE_PASSWORD_REQUEST]: changePasswordRequest,
  [TYPES.CHANGE_PASSWORD_SUCCESSED]: changePasswordSuccessed,
  [TYPES.CHANGE_PASSWORD_FAILED]: changePasswordFailed,

  [TYPES.RESET_PASSWORD_REQUEST]: resetPasswordRequest,
  [TYPES.RESET_PASSWORD_SUCCESSED]: resetPasswordSuccessed,
  [TYPES.RESET_PASSWORD_FAILED]: resetPasswordFailed,

  [TYPES.USER_CLOSE_NOTIFICATION]: userCloseNotification,
};

export const user = createReducer(initState, handlers);
