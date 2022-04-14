import React from 'react';

import { StyledDrawer } from './styled';

const CustomDrawer = ({ children, onClose, open, anchor }) => {
  return (
    <StyledDrawer onClose={onClose} open={open} anchor={anchor || 'left'}>
      {open && children}
    </StyledDrawer>
  );
};

export default CustomDrawer;
