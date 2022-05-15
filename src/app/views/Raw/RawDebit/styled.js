import { Grid } from '@mui/material';
import { styled } from '@mui/styles';

export const MetaContainer = styled(Grid)(({ theme }) => ({
  paddingBottom: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderBottom: `1px solid rgba(0,0,0,0.1)`,
}));
