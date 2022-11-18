import { styled } from '@mui/styles';

import LoadingButton from '@mui/lab/LoadingButton';

export const StyledButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: `${theme.spacing(3)} !important`,
}));
