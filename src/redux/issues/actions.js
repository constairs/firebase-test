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

export const closeNotification = () => ({
  type: TYPES.ISSUES_CLOSE_NOTIFICATION
});
