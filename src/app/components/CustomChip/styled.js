import { Chip } from '@mui/material';
import { styled } from '@mui/styles';

export const StyledChip = styled(Chip)(({ theme }) => ({
  height: '24px',
  [theme.breakpoints.down('md')]: {
    height: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '16px',
    borderRadius: '3px',
  },
  [theme.breakpoints.down(360)]: {
    height: '12px',
    borderRadius: '2px',
    fontWeight: 'normal',
  },
  '& .MuiChip-label': {
    [theme.breakpoints.down('md')]: {
      paddingLeft: '4px',
      paddingRight: '4px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.5rem',
    },
    [theme.breakpoints.down(360)]: {
      fontSize: '0.4rem',
      paddingLeft: '2px',
      paddingRight: '2px',
    },
  },
}));
