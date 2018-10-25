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
    const state = reducer(initState, actions.uploadProgressChanged(progressData));
    expect(state.uploadingFiles).toEqual([progressData]);
    const stateUpd = reducer(state, actions.uploadProgressChanged(progressDataNew));
    // state = reducer(state, actions.uploadProgressChanged(progressDataNew));
    expect(stateUpd.uploadingFiles).toEqual([progressData, progressDataNew]);
    const statUpdLast = reducer(stateUpd, actions.uploadProgressChanged(progressDataNew));
    // state = reducer(state, actions.uploadProgressChanged(progressDataNew));
    expect(statUpdLast.uploadingFiles).toEqual([progressData, progressDataNew]);
  });
});
