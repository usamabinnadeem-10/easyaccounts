import { Drawer } from '@mui/material';
import { styled } from '@mui/styles';

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '60%',
    borderRadius: '0px 6px 6px 0px',
    padding: `1.2rem`,
    '@media (max-width: 750px)': {
      width: '85%',
    },
    '@media (max-width: 600px)': {
      width: '90%',
    },
    '@media (max-width: 450px)': {
      width: '100%',
    },
  },
}));
