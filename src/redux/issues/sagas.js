import { takeLatest, call, put } from 'redux-saga/effects';
import { CREATE_ISSUE_REQUEST } from './types';

import { createIssueData } from '../../firebase/database';

import {
  createIssueSuccessed,
  createIssueFailed
} from './actions';

export function* createIssueSaga(action) {
  try {
    const createResponse = yield call(createIssueData, ...action.payload);
    yield put(createIssueSuccessed(createResponse));
  } catch (error) {
    put(createIssueFailed(error.message));
  }
}

export function* issuesSagas() {
  yield takeLatest(CREATE_ISSUE_REQUEST, createIssueSaga);
}
