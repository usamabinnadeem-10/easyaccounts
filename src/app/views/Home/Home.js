import React from "react";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import CustomLoader from "../../components/CustomLoader/CustomLoader";
import FAB from "../../containers/FAB/FAB";
import SideBar from "../../containers/SideBar/SideBar";

import useEssentials from "../../hooks/useEssentials";

import { HOME } from "../../../constants/routesConstants";
import { authenticatedRoutes } from "../../../constants/routes";

import { getAllEssentials } from "../../../store/essentials/actions";

import { useStyles } from "./styles";

const Home = (props) => {
  let location = useLocation();
  let history = useHistory();
  let classes = useStyles();
  let dispatch = useDispatch();
  let essentials = useEssentials();

  useEffect(() => {
    dispatch(getAllEssentials());
    // history.push(HOME);
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      history.push(HOME);
    }
  }, [location.pathname, history]);

  const fetched = useSelector((state) => state.essentials.fetched);

  return (
    <>
      <SideBar fetched={fetched} />
      <div className={classes.homeOffset}>
        {fetched ? (
          <Switch>
            {authenticatedRoutes.map((route, index) => {
              let Component = route.component;
              return (
                <Route key={index} path={route.path} exact>
                  <Component {...essentials} />
                </Route>
              );
            })}
          </Switch>
        ) : (
          <CustomLoader loading={!fetched} pageLoader />
        )}
      </div>
      <FAB fetched={fetched} />
    </>
  );
};

export default Home;
