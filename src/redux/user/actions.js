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

export const userUpdateRequest = updateUserData => ({
  type: TYPES.USER_UPDATE_REQUEST,
  payload: updateUserData,
});
export const userUpdateSuccessed = logoutResponse => ({
  type: TYPES.USER_UPDATE_SUCCESSED,
  payload: logoutResponse
});
export const userUpdateFailed = error => ({
  type: TYPES.USER_UPDATE_FAILED,
  payload: error
});

export const changeEmailRequest = email => ({
  type: TYPES.CHANGE_EMAIL_REQUEST,
  payload: email,
});
export const changeEmailSuccessed = changeEmailResponse => ({
  type: TYPES.CHANGE_EMAIL_SUCCESSED,
  payload: changeEmailResponse
});
export const changeEmailFailed = error => ({
  type: TYPES.CHANGE_EMAIL_FAILED,
  payload: error
});

export const changeVerificationRequest = verificationEmail => ({
  type: TYPES.CHANGE_VERIFICATION_REQUEST,
  payload: verificationEmail,
});
export const changeVerificationSuccessed = changeVerificationResponse => ({
  type: TYPES.CHANGE_VERIFICATION_SUCCESSED,
  payload: changeVerificationResponse
});
export const changeVerificationFailed = error => ({
  type: TYPES.CHANGE_VERIFICATION_FAILED,
  payload: error
});

export const changePasswordRequest = verificationEmail => ({
  type: TYPES.CHANGE_PASSWORD_REQUEST,
  payload: verificationEmail,
});
export const changePasswordSuccessed = changeVerificationResponse => ({
  type: TYPES.CHANGE_PASSWORD_SUCCESSED,
  payload: changeVerificationResponse
});
export const changePasswordFailed = error => ({
  type: TYPES.CHANGE_PASSWORD_FAILED,
  payload: error
});

export const closeNotification = () => ({
  type: TYPES.USER_CLOSE_NOTIFICATION,
});
