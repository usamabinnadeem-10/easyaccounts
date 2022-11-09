import React from 'react';

import { StyledIconButton } from './styled';

const CustomIconButton = ({ color, onClick, disabled, children }) => {
  return (
    <StyledIconButton disabled={disabled} color={color} onClick={onClick}>
      {children}
    </StyledIconButton>
  );
};

export default CustomIconButton;
