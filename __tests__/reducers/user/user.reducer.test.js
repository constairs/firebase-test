import { user as reducer, initState } from '../../../src/redux/user/reducer';
import * as actions from '../../../src/redux/user/actions';

import { userData, logoutResponse, deleteResponse, fetchResponse } from '../../fixtures';

describe('user create', () => {
  it('fetchUsersRequest', () => {
    const state = reducer(initState, actions.fetchUsersRequest());
    expect(state.userFetching).toBe(true);
  });
  it('fetchUsersSuccessed', () => {
    const state = reducer(initState, actions.fetchUsersSuccessed(fetchResponse));
    expect(state.userFetching).toBe(false);
    expect(state.users.users).toEqual([...fetchResponse]);
  });
  it('fetchUsersFailed', () => {
    const state = reducer(initState, actions.fetchUsersFailed(Error.message));
    expect(state.userFetching).toBe(false);
    expect(state.notification).toEqual({ show: true, error: Error.message, success: '' });
  });

  it('userCreateRequest', () => {
    const state = reducer(initState, actions.userCreateRequest());
    expect(state.userFetching).toBe(true);
  });
  it('userCreateSuccessed', () => {
    const state = reducer(initState, actions.userCreateSuccessed(userData));
    expect(state.userFetching).toBe(false);
    expect(state.email).toBe(userData.user.email);
    expect(state.logged).toBe(true);
    expect(state.notification).toEqual({ show: true, success: `${userData.user.email} успешно зарегистрирован`, error: '' });
  });
  it('userCreateFailed', () => {
    const state = reducer(initState, actions.userCreateFailed(Error.message));
    expect(state.userFetching).toBe(false);
    expect(state.notification).toEqual({ show: true, error: Error.message, success: '' });
  });

  it('userLoginRequest', () => {
    const state = reducer(initState, actions.userLoginRequest());
    expect(state.userFetching).toBe(true);
  });
  it('userLoginSuccessed', () => {
    const state = reducer(initState, actions.userLoginSuccessed(userData));
    expect(state.userFetching).toBe(false);
    expect(state.logged).toBe(true);
    expect(state.photoURL).toBe(userData.user.photoURL);
    expect(state.email).toBe(userData.user.email);
    expect(state.displayName).toBe(userData.user.displayName);
    expect(state.notification).toEqual({ show: true, success: `${userData.user.email} успешно вошел`, error: '' });
  });
  it('userLoginFailed', () => {
    const state = reducer(initState, actions.userLoginFailed(Error.message));
    expect(state.userFetching).toBe(false);
    expect(state.notification).toEqual({ show: true, error: Error.message, success: '' });
  });

  it('userLogoutRequest', () => {
    const state = reducer(initState, actions.userLogoutRequest());
    expect(state.userFetching).toBe(true);
  });
  it('userLogoutSuccessed', () => {
    const state = reducer(initState, actions.userLogoutSuccessed(logoutResponse));
    expect(state.userFetching).toBe(false);
    expect(state.logged).toBe(false);
    expect(state.photoURL).toBe('');
    expect(state.email).toBe('');
    expect(state.displayName).toBe('');
    expect(state.notification).toEqual({ show: true, success: logoutResponse, error: '' });
  });
  it('userLogoutFailed', () => {
    const state = reducer(initState, actions.userLogoutFailed(Error.message));
    expect(state.userFetching).toBe(false);
    expect(state.notification).toEqual({ show: true, error: Error.message, success: '' });
  });

  it('userUpdateRequest', () => {
    const state = reducer(initState, actions.userUpdateRequest());
    expect(state.userFetching).toBe(true);
  });
  it('userUpdateSuccessed', () => {
    const state = reducer(initState, actions.userUpdateSuccessed(userData));
    expect(state.userFetching).toBe(false);
    expect(state.photoURL).toBe(userData.user.profileImg);
    expect(state.displayName).toBe(userData.user.profileName);
    expect(state.notification).toEqual({ show: true, success: 'Профиль успешно обновлен', error: '' });
  });
  it('userUpdateFailed', () => {
    const state = reducer(initState, actions.userUpdateFailed(Error.message));
    expect(state.userFetching).toBe(false);
    expect(state.notification).toEqual({ show: true, error: Error.message, success: '' });
  });

  it('userDeleteRequest', () => {
    const state = reducer(initState, actions.userDeleteRequest());
    expect(state.userFetching).toBe(true);
  });
  it('userDeleteSuccessed', () => {
    const state = reducer(initState, actions.userDeleteSuccessed(deleteResponse));
    expect(state.userFetching).toBe(false);
    expect(state.photoURL).toBe('');
    expect(state.email).toBe('');
    expect(state.displayName).toBe('');
    expect(state.logged).toBe(false);
    expect(state.notification).toEqual({ show: true, success: deleteResponse, error: '' });
  });
  it('userUpdateFailed', () => {
    const state = reducer(initState, actions.userDeleteFailed(Error.message));
    expect(state.userFetching).toBe(false);
    expect(state.notification).toEqual({ show: true, error: Error.message, success: '' });
  });


  it('closeNotification', () => {
    const state = reducer(initState, actions.closeNotification());
    expect(state.notification).toEqual({ show: false, error: '', success: '' });
  });
});
