import { assoc, pipe } from 'ramda';

import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

export const initState = {
  userFetching: false,
  error: ''
};

const userCreateRequest = () => assoc('userFetching', true);
const userCreateSuccessed = () => assoc('userFetching', false);
const userCreateFailed = error => pipe(
  assoc('userFetching', false),
  assoc('error', error),
);

const handlers = {
  [TYPES.USER_CREATE_REQUEST]: userCreateRequest,
  [TYPES.USER_CREATE_SUCCESSED]: userCreateSuccessed,
  [TYPES.USER_CREATE_FAILED]: userCreateFailed,
};

export const user = createReducer(initState, handlers);
