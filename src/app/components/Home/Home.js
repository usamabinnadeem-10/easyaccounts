import React from "react";
import { useEffect } from "react";

import { Switch, Route, useHistory, useLocation } from "react-router-dom";

import FAB from "../FAB/FAB";
import SideBar from "../SideBar/SideBar";

import { HOME } from "../../../constants/routesConstants";
import { authenticatedRoutes } from "../../../constants/routes";

import { useStyles } from "./styles";

const Home = () => {
  let location = useLocation();
  let history = useHistory();
  let classes = useStyles();

  useEffect(() => {
    if (location.pathname === "/") {
      history.push(HOME);
    }
  }, [location.pathname, history]);
  return (
    <>
      <SideBar />
      <FAB />
      <div className={classes.homeOffset}>
        <Switch>
          {authenticatedRoutes.map((route, index) => {
            let Component = route.component;
            console.log(route);
            return (
              <Route key={index} path={route.path} exact>
                <Component />
              </Route>
            );
          })}
        </Switch>
      </div>
    </>
  );
};

export default Home;
