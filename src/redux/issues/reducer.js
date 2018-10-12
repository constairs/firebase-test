import { assoc, assocPath, pipe, append, lensProp, set, over, values, filter, when, path, equals } from 'ramda';

import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

export const initState = {
  issuesFetching: false,
  issues: [],
  currentIssue: {},
  notification: {
    error: '',
    success: '',
    show: false
  },
  issueFetching: false
};

const issuesLens = lensProp('issues');

const createIssueRequest = () => assoc('issueFetching', true);
const createIssueSuccessed = createResponse => pipe(
  assoc('issueFetching', false),
  over(issuesLens, append(createResponse)),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'success'], `${createResponse.title} успешно создан`),
);
const createIssueFailed = error => pipe(
  assoc('issueFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);

const deleteIssueRequest = () => assoc('issueFetching', true);
const deleteIssueSuccessed = deleteResponse => pipe(
  assoc('issueFetching', false),
  over(issuesLens, filter(issue => issue.issueId !== deleteResponse)),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'success'], `Issue ${deleteResponse} - deleted succesfully!`),
  when(
    equals(path(['currentIssue', 'issueId'], deleteResponse)),
    assoc('currentIssue', {})
  ),
);
const deleteIssueFailed = error => pipe(
  assoc('issueFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);

const fetchIssuesRequest = () => assoc('issuesFetching', true);
const fetchIssuesSuccessed = fetchResponse => pipe(
  assoc('issuesFetching', false),
  set(issuesLens, values(fetchResponse))
);
const fetchIssuesFailed = error => pipe(
  assoc('issuesFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);

const getIssueRequest = () => assoc('issueFetching', true);
const getIssueSuccessed = issue => pipe(
  assoc('issueFetching', false),
  assoc('currentIssue', issue)
);
const getIssueFailed = error => pipe(
  assoc('issuesFetching', false),
  assocPath(['notification', 'show'], true),
  assocPath(['notification', 'error'], error),
);

const issuesCloseNotification = () => pipe(
  assocPath(['notification', 'show'], false),
  assocPath(['notification', 'error'], ''),
  assocPath(['notification', 'success'], ''),
);

const handlers = {
  [TYPES.CREATE_ISSUE_REQUEST]: createIssueRequest,
  [TYPES.CREATE_ISSUE_SUCCESSED]: createIssueSuccessed,
  [TYPES.CREATE_ISSUE_FAILED]: createIssueFailed,

  [TYPES.DELETE_ISSUE_REQUEST]: deleteIssueRequest,
  [TYPES.DELETE_ISSUE_SUCCESSED]: deleteIssueSuccessed,
  [TYPES.DELETE_ISSUE_FAILED]: deleteIssueFailed,

  [TYPES.FETCH_ISSUES_REQUEST]: fetchIssuesRequest,
  [TYPES.FETCH_ISSUES_SUCCESSED]: fetchIssuesSuccessed,
  [TYPES.FETCH_ISSUES_FAILED]: fetchIssuesFailed,

  [TYPES.GET_ISSUE_REQUEST]: getIssueRequest,
  [TYPES.GET_ISSUE_SUCCESSED]: getIssueSuccessed,
  [TYPES.GET_ISSUE_FAILED]: getIssueFailed,

  [TYPES.ISSUES_CLOSE_NOTIFICATION]: issuesCloseNotification,
};

export const issues = createReducer(initState, handlers);
