import { takeLatest, take, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  CREATE_ISSUE_REQUEST,
  DELETE_ISSUE_REQUEST,
  EDIT_ISSUE_REQUEST,
  FETCH_ISSUES_REQUEST,
  GET_ISSUE_REQUEST,
  DOWNLOAD_ATTACHMENT_REQUEST,
  UPLOAD_CANCEL,
  UPLOAD_PAUSED,
  UPLOAD_RESUME
} from './types';

import {
  createIssue,
  deleteIssueData,
  editIssueData,
  fetchIssues,
  getIssue,
} from '../../firebase/database';

import {
  uploadFiles,
  downloadFiles,
  getFileMetadata,
} from '../../firebase/storage';

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
  downloadAttachmentFailed,
  uploadFilesRequest,
  uploadCancelSuccessed,
  uploadCancelFailed,
  uploadPausedSuccessed,
  uploadPausedFailed,
  uploadRunningSuccessed,
  uploadRunningFailed
} from './actions';

function* cancelUploadSaga(action) {
  try {
    yield call(action.payload.cancel);
    yield put(uploadCancelSuccessed());
  } catch (error) {
    yield put(uploadCancelFailed(error));
  }
}

function* pauseUploadSaga(action) {
  try {
    yield call(action.payload.pause);
    yield put(uploadPausedSuccessed());
  } catch (error) {
    yield put(uploadPausedFailed(error));
  }
}

function* resumeUploadSaga(action) {
  try {
    yield call(action.payload.pause);
    yield put(uploadRunningSuccessed());
  } catch (error) {
    uploadRunningFailed(error);
  }
}

export function* uploadFileSaga(files) {
  const uploadTasks = yield call(uploadFiles, files);

  yield put(uploadFilesRequest(uploadTasks));

  // uploadTask.pause();

  // uploadTask.resume();

  // uploadTask.cancel();

  yield take(UPLOAD_CANCEL, cancelUploadSaga);
  yield take(UPLOAD_PAUSED, pauseUploadSaga);
  yield take(UPLOAD_RESUME, resumeUploadSaga);

  const filesLinks = uploadTasks.snapshot.ref.getDownloadURL();

  const filesWithLinks = files.map((file, i) =>
    ({
      type: file.type,
      size: file.size,
      name: file.name,
      lastModified: file.lastModified,
      downloadUrl: filesLinks[i]
    })
  );

  return filesWithLinks;
}

export function* createIssueSaga(action) {
  try {
    if (action.payload.createIssueData.issueFiles.length > 0) {
      const files = action.payload.createIssueData.issueFiles;

      // const uploadTask = yield call(uploadFiles, action.payload.createIssueData.issueFiles);

      // const filesLinks = uploadTask.snapshot.ref.getDownloadURL();

      // const filesLinks = yield call(uploadFiles, action.payload.createIssueData.issueFiles);

      // const filesWithLinks = files.map((file, i) =>
      //   ({
      //     type: file.type,
      //     size: file.size,
      //     name: file.name,
      //     lastModified: file.lastModified,
      //     downloadUrl: filesLinks[i]
      //   })
      // );
      const filesWithLinks = yield call(uploadFileSaga, files);

      const issueWithFilesLinks = [
        ...action.payload.issueData,
        filesWithLinks,
      ];
      const createResponse = yield call(createIssue, ...issueWithFilesLinks);
      yield put(createIssueSuccessed(createResponse));
      yield put(push('/issues'));
    } else {
      const createResponse = yield call(
        createIssue,
        [
          action.payload.createIssueData.user,
          ...action.payload.createIssueData.issueData
        ]
      );
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
    if (action.payload.issueFiles.length > 0) {
      const newFiles = action.payload.issueFiles.filter(file => !file.downloadUrl);

      const filesLinks = yield call(uploadFiles, newFiles);
      const files = newFiles.map((file, i) => ({
        type: file.type,
        size: file.size,
        name: file.name,
        lastModified: file.lastModified,
        downloadUrl: filesLinks[i]
      }));

      const updatedFiles = [
        ...action.payload.issueFiles.filter(file => file.downloadUrl),
        ...files
      ];
      const issueWithFilesUpd = [
        ...action.payload.issueData,
        updatedFiles,
      ];

      const updatedIssue = yield call(editIssueData, ...issueWithFilesUpd);
      yield put(editIssueSuccessed(updatedIssue));
      yield put(push('/issues'));
    } else {
      const updatedIssue = yield call(editIssueData, ...action.payload.issueData);
      yield put(editIssueSuccessed(updatedIssue));
      yield put(push('/issues'));
    }
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
    const dowloadRes = yield call(downloadFiles, action.payload);
    const downloadMeta = yield call(getFileMetadata, action.payload);

    const file = { dowloadRes, downloadMeta };
    yield put(downloadAttachmentSuccessed(file));
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
