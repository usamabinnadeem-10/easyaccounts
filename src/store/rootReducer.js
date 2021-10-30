import { combineReducers } from "redux";

import essentialsReducer from "./essentials/reducer";
import transactionReducer from "./transactions/reducer";

export const rootReducer = combineReducers({
  essentials: essentialsReducer,
  transactions: transactionReducer,
});
