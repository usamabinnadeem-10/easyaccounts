import { styled } from '@mui/styles';
import { Grid } from '@mui/material';

export const ErrorAwareGrid = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'iserror',
})(({ theme, iserror }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  ...(iserror && {
    // padding: theme.spacing(2),
    // border: '1px solid red',
    // borderRadius: '4px',
    backgroundColor: 'rgba(255, 51, 51, 0.2)',
  }),
}));
