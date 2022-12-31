import React from 'react';

import { Switch } from '@mui/material';
import { Typography } from '@mui/material';

import { Wrapper } from './styled';

const CustomSwitch = ({ checked, onChange, label, onCheckedLabel }) => {
  return (
    <Wrapper>
      <Switch color="error" checked={checked} onChange={onChange} />
      <Typography variant="text" color={checked && 'error'}>
        {checked ? onCheckedLabel : label}
      </Typography>
    </Wrapper>
  );
};

export default CustomSwitch;
