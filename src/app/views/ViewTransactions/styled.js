import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/styles';
import { Box } from '@mui/material';
import { Button } from '@mui/material';

export const LoadMoreButton = styled(LoadingButton)(({ theme }) => ({
  marginBottom: `${theme.spacing(3)} !important`,
}));

export const DataGridWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '600px',
}));

export const DetailsButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  marginBottom: theme.spacing(1),
  justifyContent: 'flex-end',
}));

export const DetailButton = styled(Button)(({ theme }) => ({
  width: '200px',
}));
