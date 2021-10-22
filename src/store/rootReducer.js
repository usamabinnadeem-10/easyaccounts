import { combineReducers } from "redux";

import essentialsReducer from "./essentials/reducer";

export const rootReducer = combineReducers({
  essentials: essentialsReducer,
});
