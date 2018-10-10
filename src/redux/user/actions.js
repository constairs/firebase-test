import * as TYPES from './types';

export const userCreateRequest = createUserData => ({
  type: TYPES.USER_CREATE_REQUEST,
  payload: createUserData,
});
export const userCreateSuccessed = createResponse => ({
  type: TYPES.USER_CREATE_SUCCESSED,
  payload: createResponse,
});
export const userCreateFailed = error => ({
  type: TYPES.USER_CREATE_FAILED,
  payload: error
});


export const userLoginRequest = loginUserData => ({
  type: TYPES.USER_LOGIN_REQUEST,
  payload: loginUserData,
});
export const userLoginSuccessed = loginResponse => ({
  type: TYPES.USER_LOGIN_SUCCESSED,
  payload: loginResponse,
});
export const userLoginFailed = error => ({
  type: TYPES.USER_LOGIN_FAILED,
  payload: error
});

export const userLogoutRequest = () => ({
  type: TYPES.USER_LOGOUT_REQUEST,
});
export const userLogoutSuccessed = logoutResponse => ({
  type: TYPES.USER_LOGOUT_SUCCESSED,
  payload: logoutResponse
});
export const userLogoutFailed = error => ({
  type: TYPES.USER_LOGOUT_FAILED,
  payload: error
});


export const closeNotification = () => ({
  type: TYPES.USER_CLOSE_NOTIFICATION,
});
