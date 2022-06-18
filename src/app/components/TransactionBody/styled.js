import { styled } from '@mui/styles';
import { Grid } from '@mui/material';

export const ErrorAwareGrid = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'iserror',
})(({ theme, iserror }) => ({
  ...(iserror && {
    padding: theme.spacing(2),
    border: '1px solid red',
    borderRadius: '4px',
  }),
}));
