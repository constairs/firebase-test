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
