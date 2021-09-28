import React from "react";
import ReactDOM from "react-dom";

import App from "./app/App";
import reportWebVitals from "./reportWebVitals";

import CssBaseline from "@mui/material/CssBaseline";

// THIS FILE IS WHERE WE WILL PASS CUSTOM THEME, CONFIGURE STORE AND SAGAS

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
