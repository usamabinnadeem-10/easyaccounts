import { styled } from '@mui/styles';
import { Paper } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '600px',
  width: '30%',
  padding: '1.5rem',
  maxHeight: '80vh',
  overflow: 'auto',
  [theme.breakpoints.down('lg')]: {
    width: '45%',
  },
  [theme.breakpoints.down('md')]: {
    width: '60%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '80%',
  },
}));
