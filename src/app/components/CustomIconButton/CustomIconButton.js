import React from 'react';

import { StyledIconButton } from './styled';

const CustomIconButton = ({ color, onClick, children }) => {
  return (
    <StyledIconButton color={color} onClick={onClick}>
      {children}
    </StyledIconButton>
  );
};

export default CustomIconButton;
