import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/styles';
import { Typography } from '@mui/material';

export const MetaWrapper = styled(Grid)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
  marginBottom: theme.spacing(3),
  borderBottom: `1px solid rgba(105, 105, 105, 0.3)`,
}));

export const LotWrapper = styled(Grid)(({ theme }) => ({
  border: `1px solid rgba(105, 105, 105, 0.1)`,
  borderRadius: '4px',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const LotHeader = styled(Grid)(({ theme }) => ({}));

export const DetailWrapper = styled(Grid)(({ theme }) => ({}));

export const TotalText = styled(Typography)(({ theme }) => ({
  marginRight: `${theme.spacing(2)} !important`,
}));

export const LotTotalWrapper = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

export const StyledButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: `${theme.spacing(4)} !important`,
}));
