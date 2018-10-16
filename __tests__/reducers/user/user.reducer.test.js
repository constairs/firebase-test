import { user as reducer, initState } from '../../../src/redux/user/reducer';
import * as actions from '../../../src/redux/user/actions';

import { userData } from '../../fixtures';

describe('user reducer', () => {
  it('userLoginRequest', () => {
    const state = reducer(initState, actions.userLoginRequest());
    expect(state.userFetching).toBe(true);
  });
  it('userLoginSuccessed', () => {
    const state = reducer(initState, actions.userLoginSuccessed(userData));
    expect(state.userFetching).toBe(false);
    expect(state.logged).toBe(true);
    expect(state.email).toBe(userData.email);
    expect(state.photoURL).toBe(userData.photoURL);
    expect(state.displayName).toBe(userData.displayName);
    expect(state.notification).toEqual({ show: true, success: `${userData.email} успешно вошел` });
  });
  it('userLoginFailed', () => {
    const state = reducer(initState, actions.userLoginFailed(Error.message));
    expect(state.userFetching).toBe(false);
    expect(state.notification).toEqual({ show: true, error: Error.message, success: '' });
  });
});
