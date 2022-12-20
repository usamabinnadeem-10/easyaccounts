import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/styles';
import { Box } from '@mui/material';

export const LoadMoreButton = styled(LoadingButton)(({ theme }) => ({
  marginBottom: `${theme.spacing(3)} !important`,
}));

export const DataGridWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '600px',
}));
