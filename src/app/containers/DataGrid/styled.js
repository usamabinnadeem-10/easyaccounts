import styled from '@mui/styles/styled';
import Grid from '@mui/material/Grid';

export const DataGridWrapper = styled(Grid)(({ theme }) => ({
  maxHeight: '750px',
  height: '600px',
  width: '100%',
  '& .MuiDataGrid-toolbarContainer': {
    marginBottom: theme.spacing(2),
    gap: theme.spacing(1),
  },
}));
