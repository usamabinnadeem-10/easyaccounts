import React from 'react';
import { Suspense } from 'react';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Branches from './views/Branches';
import Home from './views/Home/Home';
import Login from './views/Login';

import * as routes from '../constants/routesConstants';
import { autoLogin } from '../store/auth';
import { withSnackbar } from '../app/hoc/withSnackbar';

function App({ showErrorSnackbar }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  useEffect(() => {
    if (auth.error) {
      showErrorSnackbar(auth.error);
    }
  }, [auth.error]);

  useEffect(() => {
    // if (auth.hasToken && auth.isAuthenticated) {
    //   history.push(routes.HOME);
    // }
    // if (!auth.loggingIn) {
    //   if (auth.hasToken && !auth.isAuthenticated) {
    //     history.push(routes.BRANCHES);
    //   }
    //   if (!auth.hasToken && !auth.isAuthenticated) {
    //     history.push(routes.LOGIN);
    //   }
    // }
  }, [auth, history]);
  return (
    <Switch>
      <Suspense fallback={<></>}>
        <Route path={routes.LOGIN} exact>
          <Login />
        </Route>
        <Route path={routes.BRANCHES} exact>
          <Branches />
        </Route>
        <Route path={'/home/*'}>
          <Home />
        </Route>
      </Suspense>
    </Switch>
  );
}

export default withSnackbar(App);
