import { styled } from '@mui/styles';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

export const TotalText = styled(Typography)(({ theme }) => ({
  marginRight: `${theme.spacing(2)} !important`,
}));

export const LotTotalWrapper = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

export const MetaContainer = styled(Grid)(({ theme }) => ({
  paddingBottom: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderBottom: `1px solid rgba(0,0,0,0.1)`,
}));

export const LotNumber = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'iserror',
})(({ iserror }) => ({
  color: iserror ? `#d32f2f` : `rgba(0,0,0,0.3)`,
}));
