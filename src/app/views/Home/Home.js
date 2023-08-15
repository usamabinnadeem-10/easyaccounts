import React from 'react';
import { useEffect, useMemo } from 'react';

import { useSelector } from 'react-redux';

import { Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import CustomLoader from '../../components/CustomLoader/CustomLoader';
// import FAB from "../../containers/FAB/FAB";
import SideBar from '../../containers/SideBar/SideBar';
import AllDialogs from './AllDialogs';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import useEssentials from '../../hooks/useEssentials';

import { LOGIN } from '../../../constants/routesConstants';
import { authenticatedRoutes } from '../../../constants/routes';
import { PrivateRoute } from './PrivateRoute';

import { StyledDiv } from './styled';

import { withSnackbar } from '../../hoc/withSnackbar';
import { useWindowSize } from '../../hooks/useWindowSize';

const Home = ({ showErrorSnackbar }) => {
  let location = useLocation();
  let history = useHistory();
  let { values: essentials, loading } = useEssentials();

  const { error } = useSelector((state) => state.essentials);
  const role = useSelector((state) => state.auth.userRole);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loggingIn = useSelector((state) => state.auth.loggingIn);

  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const dimensions = useWindowSize();

  useEffect(() => {
    if (!isAuthenticated && !loggingIn) {
      history.push(LOGIN);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/home') {
      history.push('/home/');
    }
  }, [location.pathname, history]);

  useEffect(() => {
    if (error) {
      showErrorSnackbar(error);
    }
  }, [error]);

  return (
    <>
      <AllDialogs />
      <SideBar tablet={tablet} fetched={!loading} />
      <StyledDiv tablet={tablet ? 'true' : ''} mobile={mobile ? 'true' : ''}>
        {!loading && !loggingIn ? (
          <Switch>
            {authenticatedRoutes.map((route, index) => {
              let Component = route.component;
              return (
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loginRedirect={'/login'}
                  key={index}
                  path={route.path}
                  exact
                >
                  <Component
                    role={role}
                    dimensions={dimensions}
                    {...essentials}
                  />
                </PrivateRoute>
              );
            })}
          </Switch>
        ) : (
          <CustomLoader loading={loading} pageLoader />
        )}
      </StyledDiv>
      {/* <FAB fetched={fetched} /> */}
    </>
  );
};

export default withSnackbar(Home);
