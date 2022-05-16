import { styled } from '@mui/styles';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

export const TotalText = styled(Typography)(({ theme }) => ({
  marginRight: `${theme.spacing(2)} !important`,
}));

export const LotTotalWrapper = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));
