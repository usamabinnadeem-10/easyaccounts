import { Drawer } from '@mui/material';
import { styled } from '@mui/styles';

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '60vw',
    borderRadius: '0px 6px 6px 0px',
    padding: `1.2rem`,
  },
}));
