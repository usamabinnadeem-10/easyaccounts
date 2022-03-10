import { combineReducers } from "redux";

import essentialsReducer from "./essentials/reducer";
import transactionReducer from "./transactions/reducer";
import accountsReducer from "./accounts/reducer";
import authReducer from "./auth/reducer";

export const rootReducer = combineReducers({
  essentials: essentialsReducer,
  transactions: transactionReducer,
  accounts: accountsReducer,
  auth: authReducer,
});
