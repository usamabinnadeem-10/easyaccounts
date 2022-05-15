import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

import { styled } from '@mui/styles';

export const LotContainer = styled(Grid)(({ theme }) => ({
  paddingBottom: theme.spacing(4),
  marginBottom: theme.spacing(3),
  borderBottom: `2px solid rgba(0,0,0)`,
}));

export const LotHeaderContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const LotNumber = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'iserror',
})(({ iserror }) => ({
  color: iserror ? `#d32f2f` : `rgba(0,0,0,0.3)`,
}));

export const LotDetailRow = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'iserror',
})(({ iserror }) => {
  return iserror
    ? {
        borderBottom: `1px solid rgba(232, 72, 72)`,
        // backgroundColor: 'rgb(255, 235, 122, 0.5)',
      }
    : {};
});
