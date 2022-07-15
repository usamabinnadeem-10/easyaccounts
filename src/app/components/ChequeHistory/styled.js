import { Drawer } from '@mui/material';
import { styled } from '@mui/styles';

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    '@media (max-width: 950px)': {
      maxWidth: '75%',
    },
    '@media (max-width: 750px)': {
      maxWidth: '85%',
    },
    '@media (max-width: 600px)': {
      maxWidth: '100%',
    },
  },
}));
