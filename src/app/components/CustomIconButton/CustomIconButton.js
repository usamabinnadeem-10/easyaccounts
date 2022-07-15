import React from 'react';

import { IconButton } from '@mui/material';

const CustomIconButton = ({ color, onClick, children }) => {
  return (
    <IconButton color={color} onClick={onClick}>
      {children}
    </IconButton>
  );
};

export default CustomIconButton;
