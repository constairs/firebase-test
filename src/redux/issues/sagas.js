import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  CREATE_ISSUE_REQUEST,
  DELETE_ISSUE_REQUEST,
  EDIT_ISSUE_REQUEST,
  FETCH_ISSUES_REQUEST,
  GET_ISSUE_REQUEST,
  DOWNLOAD_ATTACHMENT_REQUEST
} from './types';

import {
  createIssueData,
  deleteIssueData,
  editIssueData,
  fetchIssues,
  getIssue,
} from '../../firebase/database';

import { uploadFiles, downloadFiles } from '../../firebase/storage';

import {
  createIssueSuccessed,
  createIssueFailed,
  fetchIssuesSuccessed,
  fetchIssuesFailed,
  deleteIssueSuccessed,
  deleteIssueFailed,
  editIssueSuccessed,
  editIssueFailed,
  getIssueSuccessed,
  getIssueFailed,
  downloadAttachmentSuccessed,
  downloadAttachmentFailed
} from './actions';

export function* createIssueSaga(action) {
  try {
    if (action.payload.issueFiles.length > 0) {
      const issueWithFiles = [
        ...action.payload.issueData,
        yield call(uploadFiles, action.payload.issueFiles),
      ];
      console.log(issueWithFiles);
      const createResponse = yield call(createIssueData, ...issueWithFiles);
      yield put(createIssueSuccessed(createResponse));
      yield put(push('/issues'));
    } else {
      const createResponse = yield call(createIssueData, ...action.payload.issueData);
      yield put(createIssueSuccessed(createResponse));
      yield put(push('/issues'));
    }
  } catch (error) {
    put(createIssueFailed(error.message));
  }
}

export function* deleteIssueSaga(action) {
  try {
    const deleteResponse = yield call(deleteIssueData, action.payload);
    yield put(deleteIssueSuccessed(deleteResponse));
    yield put(push('/issues'));
  } catch (error) {
    put(deleteIssueFailed(error.message));
  }
}

export function* editIssueSaga(action) {
  try {
    const updatedIssue = yield call(editIssueData, ...action.payload);
    yield put(editIssueSuccessed(updatedIssue));
    yield put(push('/issues'));
  } catch (error) {
    put(editIssueFailed(error.message));
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
    yield put(push('/issues/issue/'));
  } catch (error) {
    yield put(getIssueFailed(error.message));
  }
}

export function* downloadAttachmentSaga(action) {
  try {
    const dowloadResponse = yield call(downloadFiles, action.payload);
    yield put(downloadAttachmentSuccessed(dowloadResponse));
  } catch (error) {
    yield put(downloadAttachmentFailed(error.message));
  }
}

export function* issuesSagas() {
  yield takeLatest(CREATE_ISSUE_REQUEST, createIssueSaga);
  yield takeLatest(DELETE_ISSUE_REQUEST, deleteIssueSaga);
  yield takeLatest(GET_ISSUE_REQUEST, getIssueSaga);
  yield takeLatest(EDIT_ISSUE_REQUEST, editIssueSaga);
  yield takeLatest(FETCH_ISSUES_REQUEST, fetchIssuesSaga);
  yield takeLatest(DOWNLOAD_ATTACHMENT_REQUEST, downloadAttachmentSaga);
}
