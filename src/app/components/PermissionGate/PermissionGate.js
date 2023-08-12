import React from 'react';

import { useSelector } from 'react-redux';

const PermissionGate = ({ children, permit }) => {
  const userPermissions = useSelector((state) => state.auth.permissions);
  const userRole = useSelector((state) => state.auth.userRole);

  // if permit is null, then allow all
  // if permit is an empty array, dont allow
  // else check permit array and if role is included
  const hasPermission = () => {
    return !permit
      ? true
      : permit.length
      ? userPermissions.some((perm) => permit.includes(perm))
      : false;
  };

  if (hasPermission() || userRole === 'admin') {
    return <>{children}</>;
  }
  return <></>;
};

export default PermissionGate;
