import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { CREATE_ISSUE_REQUEST, DELETE_ISSUE_REQUEST, EDIT_ISSUE_REQUEST, FETCH_ISSUES_REQUEST, GET_ISSUE_REQUEST } from './types';

import {
  createIssueData,
  deleteIssueData,
  fetchIssues,
  getIssue,
} from '../../firebase/database';

import {
  createIssueSuccessed,
  createIssueFailed,
  fetchIssuesSuccessed,
  fetchIssuesFailed,
  deleteIssueSuccessed,
  deleteIssueFailed,
  getIssueSuccessed,
  getIssueFailed,
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

export function* deleteIssueSaga(action) {
  try {
    const deleteResponse = yield call(deleteIssueData, action.payload);
    yield put(deleteIssueSuccessed(deleteResponse));
  } catch (error) {
    put(deleteIssueFailed(error.message));
  }
}

export function* editIssueSaga(action) {
  try {
    const deleteResponse = yield call(deleteIssueData, action.payload);
    yield put(deleteIssueSuccessed(deleteResponse));
  } catch (error) {
    put(deleteIssueFailed(error.message));
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

export function* getIssueSaga(action) {
  try {
    const issue = yield call(getIssue, action.payload);
    yield put(getIssueSuccessed(issue));
    // yield put(push(`/issue/${issue.issueId}`));
  } catch (error) {
    yield put(getIssueFailed(error.message));
  }
}

export function* issuesSagas() {
  yield takeLatest(CREATE_ISSUE_REQUEST, createIssueSaga);
  yield takeLatest(DELETE_ISSUE_REQUEST, deleteIssueSaga);
  yield takeLatest(GET_ISSUE_REQUEST, getIssueSaga);
  yield takeLatest(EDIT_ISSUE_REQUEST, editIssueSaga);
  yield takeLatest(FETCH_ISSUES_REQUEST, fetchIssuesSaga);
}
