import { makeStyles } from '@mui/styles';
import { styled } from '@mui/styles';
import { TextField } from '@mui/material';

export const useStyles = makeStyles({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30vw',
    padding: '1.5rem',
    maxHeight: '80vh',
    overflow: 'auto',
  },
  select: {
    marginBottom: '1rem',
  },
  dateWrapper: {
    display: 'flex',
    justifyContent: 'center',
    height: '35px',
    marginBottom: '1.5rem',
  },
});

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-input': {
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
    },
  },
  '& .MuiInput-input': {
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
    },
  },
}));
