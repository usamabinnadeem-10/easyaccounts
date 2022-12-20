import styled from '@mui/styles/styled';
import Grid from '@mui/material/Grid';

export const DataGridWrapper = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'foo',
})(({ theme }) => ({
  maxHeight: '750px',
  height: '600px',
}));
