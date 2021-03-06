import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { user } from './user/reducer';

const persistedUser = persistReducer(
  { key: 'user', storage },
  user
);

export const rootReducer = combineReducers({
  persistedUser,
});
