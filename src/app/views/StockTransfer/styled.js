import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { styled } from '@mui/styles';
import { Typography } from '@mui/material';

export const MetaWrapper = styled(Grid)(({ theme }) => ({
  borderBottom: `1px solid rgba(105, 105, 105, 0.1)`,
  paddingBottom: theme.spacing(2),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

export const RowWrapper = styled(Grid)(({ theme }) => ({
  borderBottom: `1px solid rgba(105, 105, 105, 0.1)`,
  padding: theme.spacing(1, '0rem'),
}));

export const StyledButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: `${theme.spacing(2)} !important`,
}));

export const Error = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: 'block',
}));
