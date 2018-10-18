import * as TYPES from './types';

export const fetchUsersRequest = () => ({
  type: TYPES.FETCH_USERS_REQUEST
});
export const fetchUsersSuccessed = fetchResponse => ({
  type: TYPES.FETCH_USERS_SUCCESSED,
  payload: fetchResponse
});
export const fetchUsersFailed = error => ({
  type: TYPES.FETCH_USERS_FAILED,
  payload: error
});

export const userCreateRequest = createUserData => ({
  type: TYPES.USER_CREATE_REQUEST,
  payload: createUserData
});
export const userCreateSuccessed = createResponse => ({
  type: TYPES.USER_CREATE_SUCCESSED,
  payload: createResponse
});
export const userCreateFailed = error => ({
  type: TYPES.USER_CREATE_FAILED,
  payload: error
});

export const userLoginRequest = loginUserData => ({
  type: TYPES.USER_LOGIN_REQUEST,
  payload: loginUserData
});
export const userLoginSuccessed = loginResponse => ({
  type: TYPES.USER_LOGIN_SUCCESSED,
  payload: loginResponse
});
export const userLoginFailed = error => ({
  type: TYPES.USER_LOGIN_FAILED,
  payload: error
});

export const userLogoutRequest = () => ({
  type: TYPES.USER_LOGOUT_REQUEST
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
  payload: updateUserData
});
export const userUpdateSuccessed = logoutResponse => ({
  type: TYPES.USER_UPDATE_SUCCESSED,
  payload: logoutResponse
});
export const userUpdateFailed = error => ({
  type: TYPES.USER_UPDATE_FAILED,
  payload: error
});

export const userDeleteRequest = () => ({
  type: TYPES.USER_DELETE_REQUEST
});
export const userDeleteSuccessed = deleteResponse => ({
  type: TYPES.USER_DELETE_SUCCESSED,
  payload: deleteResponse
});
export const userDeleteFailed = error => ({
  type: TYPES.USER_DELETE_FAILED,
  payload: error
});

export const changeEmailRequest = email => ({
  type: TYPES.CHANGE_EMAIL_REQUEST,
  payload: email
});
export const changeEmailSuccessed = changeEmailResponse => ({
  type: TYPES.CHANGE_EMAIL_SUCCESSED,
  payload: changeEmailResponse
});
export const changeEmailFailed = error => ({
  type: TYPES.CHANGE_EMAIL_FAILED,
  payload: error
});

export const sendVerificationRequest = verificationEmail => ({
  type: TYPES.SEND_VERIFICATION_REQUEST,
  payload: verificationEmail
});
export const sendVerificationSuccessed = sendVerficationResponse => ({
  type: TYPES.SEND_VERIFICATION_SUCCESSED,
  payload: sendVerficationResponse
});
export const sendVerificationFailed = error => ({
  type: TYPES.SEND_VERIFICATION_FAILED,
  payload: error
});

export const changePasswordRequest = password => ({
  type: TYPES.CHANGE_PASSWORD_REQUEST,
  payload: password
});
export const changePasswordSuccessed = changePasswordResponse => ({
  type: TYPES.CHANGE_PASSWORD_SUCCESSED,
  payload: changePasswordResponse
});
export const changePasswordFailed = error => ({
  type: TYPES.CHANGE_PASSWORD_FAILED,
  payload: error
});

export const resetPasswordRequest = emailAddress => ({
  type: TYPES.RESET_PASSWORD_REQUEST,
  payload: emailAddress
});
export const resetPasswordSuccessed = resetPasswordResponse => ({
  type: TYPES.RESET_PASSWORD_SUCCESSED,
  payload: resetPasswordResponse
});
export const resetPasswordFailed = error => ({
  type: TYPES.RESET_PASSWORD_FAILED,
  payload: error
});

export const closeNotification = () => ({
  type: TYPES.USER_CLOSE_NOTIFICATION
});
