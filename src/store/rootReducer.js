import { combineReducers } from "redux";

import essentialsReducer from "./essentials/reducer";
import transactionReducer from "./transactions/reducer";
import accountsReducer from "./accounts/reducer";
import authReducer from "./auth/reducer";
import rawReducer from "./raw/reducer";
import dyingReducer from "./dying/reducer";

export const rootReducer = combineReducers({
  essentials: essentialsReducer,
  transactions: transactionReducer,
  accounts: accountsReducer,
  auth: authReducer,
  raw: rawReducer,
  dying: dyingReducer,
});
