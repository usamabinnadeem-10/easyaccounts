import React from "react";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Branches from "./views/Branches";
import Home from "./views/Home/Home";
import Login from "./views/Login";

import { autoLogin } from "../store/auth";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  useEffect(() => {
    if (auth.hasToken && auth.isAuthenticated) {
      history.push("/home");
    }
    if (auth.hasToken && !auth.isAuthenticated) {
      history.push("/branches");
    }
    if (!auth.hasToken && !auth.isAuthenticated) {
      history.push("/login");
    }
  }, [auth, history]);
  return (
    <Switch>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/branches" exact>
        <Branches />
      </Route>
      {auth.hasToken && auth.isAuthenticated && (
        <Route path="/home">
          <Home />
        </Route>
      )}
    </Switch>
  );
}

export default App;
