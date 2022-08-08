import { IconButton } from '@mui/material';
import { styled } from '@mui/styles';

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: '4px',
    '& svg': {
      fontSize: '20px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: '2px',
    '& svg': {
      fontSize: '16px',
    },
  },
  [theme.breakpoints.down(360)]: {
    '& svg': {
      fontSize: '12px',
    },
  },
}));
