import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { CREATE_ISSUE_REQUEST, FETCH_ISSUES_REQUEST } from './types';

import {
  createIssueData,
  fetchIssues
} from '../../firebase/database';

import {
  createIssueSuccessed,
  createIssueFailed,
  fetchIssuesSuccessed,
  fetchIssuesFailed
} from './actions';

export function* createIssueSaga(action) {
  try {
    const createResponse = yield call(createIssueData, ...action.payload);
    yield put(createIssueSuccessed(createResponse));
    yield put(push('/issues'));
  } catch (error) {
    put(createIssueFailed(error.message));
  }
}

export function* fetchIssuesSaga() {
  try {
    const fetchResponse = yield call(fetchIssues);
    yield put(fetchIssuesSuccessed(fetchResponse));
  } catch (error) {
    yield put(fetchIssuesFailed(error.message));
  }
}

export function* issuesSagas() {
  yield takeLatest(CREATE_ISSUE_REQUEST, createIssueSaga);
  yield takeLatest(FETCH_ISSUES_REQUEST, fetchIssuesSaga);
}
