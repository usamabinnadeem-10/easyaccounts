import React from 'react';

import { StyledDrawer } from './styled';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import CustomIconButton from '../../components/CustomIconButton';

import { useWindowSize } from '../../hooks/useWindowSize';

const CustomDrawer = ({ children, onClose, open, anchor }) => {
  const { width } = useWindowSize();

  return (
    <StyledDrawer onClose={onClose} open={open} anchor={anchor || 'left'}>
      {width <= 750 && (
        <CustomIconButton color='error' onClick={onClose}>
          <CancelOutlinedIcon />
        </CustomIconButton>
      )}
      {open && children}
    </StyledDrawer>
  );
};

export default CustomDrawer;
