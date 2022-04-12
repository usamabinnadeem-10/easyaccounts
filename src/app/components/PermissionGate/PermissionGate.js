import React from 'react';

import { useSelector } from 'react-redux';

const PermissionGate = ({ children, permit }) => {
  const userRole = useSelector((state) => state.auth.userRole);

  // if permit is null, then allow all
  // if permit is an empty array, dont allow
  // else check permit array and if role is included
  const hasPermission = () => {
    return !permit ? true : permit.length ? permit.includes(userRole) : false;
  };

  if (hasPermission()) {
    return <>{children}</>;
  }
  return <></>;
};

export default PermissionGate;
