import React from 'react';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import CustomLoader from '../../components/CustomLoader/CustomLoader';
// import FAB from "../../containers/FAB/FAB";
import SideBar from '../../containers/SideBar/SideBar';

import useEssentials from '../../hooks/useEssentials';

import { HOME } from '../../../constants/routesConstants';
import { LOGIN } from '../../../constants/routesConstants';
import { authenticatedRoutes } from '../../../constants/routes';
import { PrivateRoute } from './PrivateRoute';

import { getAllEssentials } from '../../../store/essentials';
import { resetState } from '../../../store/essentials';

import { useStyles } from './styles';

import { withSnackbar } from '../../hoc/withSnackbar';

const Home = ({ showErrorSnackbar }) => {
  let location = useLocation();
  let history = useHistory();
  let classes = useStyles();
  let dispatch = useDispatch();
  let essentials = useEssentials();

  const { fetched, error } = useSelector((state) => state.essentials);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getAllEssentials());
    } else {
      history.push(LOGIN);
    }
    return () => {
      dispatch(resetState());
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (location.pathname === '/') {
      history.push(HOME);
    }
  }, [location.pathname, history]);

  useEffect(() => {
    if (error) {
      showErrorSnackbar(error);
    }
  }, [error]);

  return (
    <>
      <SideBar fetched={fetched} />
      <div className={classes.homeOffset}>
        {fetched ? (
          <Switch>
            {authenticatedRoutes.map((route, index) => {
              let Component = route.component;
              return (
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loginRedirect={'/login'}
                  key={index}
                  path={route.path}
                  exact>
                  <Component {...essentials} />
                </PrivateRoute>
              );
            })}
          </Switch>
        ) : (
          <CustomLoader loading={!fetched} pageLoader />
        )}
      </div>
      {/* <FAB fetched={fetched} /> */}
    </>
  );
};

export default withSnackbar(Home);
