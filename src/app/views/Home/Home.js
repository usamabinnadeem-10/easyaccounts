import React from "react";
import { useEffect } from "react";

import { Switch, Route, useHistory, useLocation } from "react-router-dom";

import { Grid } from "@mui/material";

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
    <Grid container direction="row" wrap="nowrap">
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
    </Grid>
  );
};

export default Home;
