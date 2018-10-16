import * as TYPES from './types';

export const createIssueRequest = issueData => ({
  type: TYPES.CREATE_ISSUE_REQUEST,
  payload: issueData
});
export const createIssueSuccessed = createIssueResponse => ({
  type: TYPES.CREATE_ISSUE_SUCCESSED,
  payload: createIssueResponse
});
export const createIssueFailed = error => ({
  type: TYPES.CREATE_ISSUE_FAILED,
  payload: error
});

export const deleteIssueRequest = issueId => ({
  type: TYPES.DELETE_ISSUE_REQUEST,
  payload: issueId
});
export const deleteIssueSuccessed = createIssueResponse => ({
  type: TYPES.DELETE_ISSUE_SUCCESSED,
  payload: createIssueResponse
});
export const deleteIssueFailed = error => ({
  type: TYPES.DELETE_ISSUE_FAILED,
  payload: error
});

export const openIssueEditor = issueId => ({
  type: TYPES.OPEN_ISSUE_EDITOR,
  payload: issueId
});

export const getIssueRequest = issueId => ({
  type: TYPES.GET_ISSUE_REQUEST,
  payload: issueId
});
export const getIssueSuccessed = issue => ({
  type: TYPES.GET_ISSUE_SUCCESSED,
  payload: issue
});
export const getIssueFailed = error => ({
  type: TYPES.GET_ISSUE_FAILED,
  payload: error
});
export const editIssueRequest = issueData => ({
  type: TYPES.EDIT_ISSUE_REQUEST,
  payload: issueData
});
export const editIssueSuccessed = updatedIssue => ({
  type: TYPES.EDIT_ISSUE_SUCCESSED,
  payload: updatedIssue
});
export const editIssueFailed = error => ({
  type: TYPES.EDIT_ISSUE_FAILED,
  payload: error
});

export const fetchIssuesRequest = () => ({
  type: TYPES.FETCH_ISSUES_REQUEST
});
export const fetchIssuesSuccessed = fetchIssuesResponse => ({
  type: TYPES.FETCH_ISSUES_SUCCESSED,
  payload: fetchIssuesResponse
});
export const fetchIssuesFailed = error => ({
  type: TYPES.FETCH_ISSUES_FAILED,
  payload: error
});

export const downloadAttachmentRequest = url => ({
  type: TYPES.DOWNLOAD_ATTACHMENT_REQUEST,
  payload: url
});

export const downloadAttachmentSuccessed = downloadRes => ({
  type: TYPES.DOWNLOAD_ATTACHMENT_SUCCESSED,
  payload: downloadRes
});

export const downloadAttachmentFailed = error => ({
  type: TYPES.DOWNLOAD_ATTACHMENT_FAILED,
  payload: error
});

export const closeNotification = () => ({
  type: TYPES.ISSUES_CLOSE_NOTIFICATION
});
