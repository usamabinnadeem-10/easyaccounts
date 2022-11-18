import { styled } from '@mui/styles';

import { Form } from 'formik';

import LoadingButton from '@mui/lab/LoadingButton';

export const StyledButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: `${theme.spacing(3)} !important`,
}));

export const StyledForm = styled(Form)(({ theme }) => ({
  width: '100%',
}));
