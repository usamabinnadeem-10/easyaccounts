import React from "react";

import { Route } from "react-router-dom";

import { PropTypes } from "prop-types";

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
        isAuthenticated
          ? React.cloneElement(children, { history, location, match })
          : (window.location = loginRedirect)
      }
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  loginRedirect: PropTypes.string,
};
