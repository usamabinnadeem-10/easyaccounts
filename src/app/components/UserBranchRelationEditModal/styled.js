import { Grid, Box } from '@mui/material';
import { styled } from '@mui/styles';
import { Typography, Checkbox, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const Container = styled(Grid)(({ theme }) => ({
  width: '400px',
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}));

export const Form = styled(Grid)(({ theme }) => ({
  height: '300px',
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  overflow: 'auto',
}));

export const FormGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  marginBottom: 12,
}));

export const FormRow = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  padding: 0,
}));

export const Button = styled(LoadingButton)(({ theme }) => ({
  borderRadius: 12,
  width: 100,
  marginLeft: 'auto',
}));

export const BoldText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '15px',
  color: '#212121',
  margin: 0,
}));

export const RowText = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '12px',
  color: '#5d636b',
  margin: 0,
}));

export const Search = styled(TextField)(({ theme }) => ({}));
