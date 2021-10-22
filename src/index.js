import React from "react";
import ReactDOM from "react-dom";

import App from "./app/App";
import reportWebVitals from "./reportWebVitals";

import CssBaseline from "@mui/material/CssBaseline";

import { rootReducer } from "./store/rootReducer";
import { rootSagas } from "./store/rootSaga";

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

rootSagas.forEach((saga) => sagaMiddleware.run(saga));

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
