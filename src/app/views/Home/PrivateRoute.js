import React from 'react';

import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import { PropTypes } from 'prop-types';

export const PrivateRoute = ({
  children,
  isAuthenticated,
  loginRedirect,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={({ history, location, match }) =>
        isAuthenticated ? (
          React.cloneElement(children, { history, location, match })
        ) : (
          <Redirect
            to={loginRedirect}
            state={{
              from: location,
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  loginRedirect: PropTypes.string,
};
