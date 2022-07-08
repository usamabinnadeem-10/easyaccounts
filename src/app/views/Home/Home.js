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

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import useEssentials from '../../hooks/useEssentials';

import { HOME } from '../../../constants/routesConstants';
import { LOGIN } from '../../../constants/routesConstants';
import { authenticatedRoutes } from '../../../constants/routes';
import { PrivateRoute } from './PrivateRoute';

import {
  getAllEssentials,
  resetState,
  setBreakpoint,
} from '../../../store/essentials';

import { StyledDiv } from './styled';

import { withSnackbar } from '../../hoc/withSnackbar';
import { useWindowSize } from '../../hooks/useWindowSize';

const Home = ({ showErrorSnackbar }) => {
  let location = useLocation();
  let history = useHistory();
  let dispatch = useDispatch();
  let essentials = useEssentials();

  const { fetched, error } = useSelector((state) => state.essentials);
  const role = useSelector((state) => state.auth.userRole);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const dimensions = useWindowSize();

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
      <SideBar tablet={tablet} fetched={fetched} />
      <StyledDiv tablet={tablet} mobile={mobile}>
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
          <CustomLoader loading={!fetched} pageLoader />
        )}
      </StyledDiv>
      {/* <FAB fetched={fetched} /> */}
    </>
  );
};

export default withSnackbar(Home);
