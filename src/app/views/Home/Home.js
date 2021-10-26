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

import { HOME } from "../../../constants/routesConstants";
import { authenticatedRoutes } from "../../../constants/routes";

import { getAllEssentials } from "../../../store/essentials/actions";

import { useStyles } from "./styles";

const Home = () => {
  let location = useLocation();
  let history = useHistory();
  let classes = useStyles();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEssentials());
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      history.push(HOME);
    }
  }, [location.pathname, history]);

  const fetched = useSelector((state) => state.essentials.fetched);

  return (
    <>
      <SideBar />
      <div className={classes.homeOffset}>
        {fetched ? (
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
        ) : (
          <CustomLoader loading={!fetched} pageLoader />
        )}
      </div>
      <FAB />
    </>
  );
};

export default Home;
