import { combineReducers } from 'redux';

import essentialsReducer from './essentials/reducer';
import transactionReducer from './transactions/reducer';
import accountsReducer from './accounts/reducer';
import authReducer from './auth/reducer';
import rawReducer from './raw/reducer';
import dyingReducer from './dying/reducer';
import cacheReducer from './cache/reducer';
import modalReducer from './modals/reducer';

export const rootReducer = combineReducers({
  essentials: essentialsReducer,
  transactions: transactionReducer,
  accounts: accountsReducer,
  auth: authReducer,
  raw: rawReducer,
  dying: dyingReducer,
  cache: cacheReducer,
  modals: modalReducer,
});
