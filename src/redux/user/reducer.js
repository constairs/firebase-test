import { assoc, assocPath, pipe } from 'ramda';

import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

export const initState = {
  userFetching: false,
  authData: '',
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

const userCloseNotification = () => pipe(
  assocPath(['notification', 'show'], false),
  assocPath(['notification', 'error'], ''),
  assocPath(['notification', 'success'], ''),
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

  [TYPES.USER_CLOSE_NOTIFICATION]: userCloseNotification,
};

export const user = createReducer(initState, handlers);
