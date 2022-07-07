import React from 'react';

import { Typography } from '@mui/material';

import { useWindowSize } from '../../hooks/useWindowSize';

const Heading = ({ heading }) => {
  const size = useWindowSize();

  return (
    <Typography
      variant={size.width <= 600 ? 'h6' : 'h5'}
      sx={{ mb: 2, fontWeight: 900 }}>
      {heading}
    </Typography>
  );
};

export default Heading;
