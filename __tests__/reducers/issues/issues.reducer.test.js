import { issues as reducer, initState } from '../../../src/redux/issues/reducer';
import * as actions from '../../../src/redux/issues/actions';

const progressData = {
  name: 'name',
  progress: 55,
};

const progressDataNew = {
  name: 'name2',
  progress: 66,
};

describe('issues reducer', () => {
  it('uploadProgressChanged', () => {
    let state = reducer(initState, actions.uploadProgressChanged(progressData));
    expect(state.uploadingFiles).toEqual([progressData]);
    state = reducer(state, actions.uploadProgressChanged(progressDataNew));
    expect(state.uploadingFiles).toEqual([progressData, progressDataNew]);
    state = reducer(state, actions.uploadProgressChanged(progressDataNew));
    expect(state.uploadingFiles).toEqual([progressData, progressDataNew]);
  });
});
