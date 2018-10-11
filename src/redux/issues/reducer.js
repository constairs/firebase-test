import { assoc, assocPath, pipe, append, lensProp, over } from 'ramda';

import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

export const initState = {
  issuesFetching: false,
  issues: [],
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


const handlers = {
  [TYPES.CREATE_ISSUE_REQUEST]: createIssueRequest,
  [TYPES.CREATE_ISSUE_SUCCESSED]: createIssueSuccessed,
  [TYPES.CREATE_ISSUE_FAILED]: createIssueFailed,
};

export const issues = createReducer(initState, handlers);
