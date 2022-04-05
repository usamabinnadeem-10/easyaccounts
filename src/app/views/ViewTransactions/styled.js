import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/styles';

export const LoadMoreButton = styled(LoadingButton)(({ theme }) => ({
  marginBottom: `${theme.spacing(3)} !important`,
}));
