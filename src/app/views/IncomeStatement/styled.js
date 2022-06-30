import { Grid } from '@mui/material';
import { Paper } from '@mui/material';
import { styled } from '@mui/styles';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1, 3, 3, 3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const IncomeDataWrapper = styled(Grid)(({ theme }) => ({
  maxWidth: '400px',
  padding: theme.spacing(3),
}));

export const LiabilitesEquityWrapper = styled(Grid)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
}));
