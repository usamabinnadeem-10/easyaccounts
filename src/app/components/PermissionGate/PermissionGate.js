import React from 'react';

import { useSelector } from 'react-redux';

const PermissionGate = ({ children, permissions, roles }) => {
  const userPermissions = useSelector((state) => state.auth.permissions);
  const userRole = useSelector((state) => state.auth.userRole);

  const hasRole = () => (roles ? roles?.includes(userRole) : false);

  // if permit is null, then allow all
  // if permit is an empty array, dont allow
  // else check permit array and if role is included
  const hasPermission = () => {
    return !permissions
      ? false
      : permissions.length
      ? userPermissions.some((perm) => permissions.includes(perm))
      : false;
  };

  if (hasPermission() || hasRole() || userRole === 'admin') {
    return <>{children}</>;
  }
  return <></>;
};

export default PermissionGate;
