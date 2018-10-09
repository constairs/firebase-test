import * as TYPES from './types';

export const createUserRequest = createUserData => ({
  type: TYPES.USER_CREATE_REQUEST,
  payload: createUserData,
});
export const createUserSuccessed = response => ({
  type: TYPES.USER_CREATE_SUCCESSED,
  payload: response,
});
export const createUserFailed = error => ({
  type: TYPES.USER_CREATE_FAILED,
  payload: error
});
