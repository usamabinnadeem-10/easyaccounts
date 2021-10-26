import React from "react";
import { useEffect } from "react";

import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import FAB from "../../containers/FAB/FAB";
import SideBar from "../../containers/SideBar/SideBar";

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
      <div className={classes.homeOffset}>
        <Switch>
          {authenticatedRoutes.map((route, index) => {
            let Component = route.component;
            return (
              <Route key={index} path={route.path} exact>
                <Component />
              </Route>
            );
          })}
        </Switch>
      </div>
      <FAB />
    </>
  );
};

export default Home;
