import { styled } from '@mui/styles';

import { Grid } from '@mui/material';

export const ReceiptImagesWrapper = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  overflow: 'scroll !important',
  border: '1px solid rgba(0,0,0,0.3)',
  borderRadius: '4px',
}));
