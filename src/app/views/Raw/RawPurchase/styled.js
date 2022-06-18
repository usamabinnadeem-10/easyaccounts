import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/styles';
import { Typography } from '@mui/material';

export const MetaWrapper = styled(Grid)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
  marginBottom: theme.spacing(3),
  borderBottom: `1px solid rgba(105, 105, 105, 0.3)`,
}));

export const LotWrapper = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'error',
})(({ theme, error }) => ({
  border: error ? `1px solid red` : `0px solid rgba(105, 105, 105, 0.1)`,
  borderRadius: error ? '4px' : '0px',
  borderBottom: error ? `1px solid red` : `2px solid rgb(0,0,0)`,
  padding: error ? theme.spacing(2) : theme.spacing('0px', '0px', 2, '0px'),
  marginBottom: theme.spacing(2),
}));

export const LotHeader = styled(Grid)(({ theme }) => ({}));

export const DetailWrapper = styled(Grid)(({ theme }) => ({}));

export const StyledButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: `${theme.spacing(4)} !important`,
}));

export const UniqueError = styled(Typography)(({ theme }) => ({}));
