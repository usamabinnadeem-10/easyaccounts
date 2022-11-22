import { styled } from '@mui/styles';
import { Grid } from '@mui/material';

export const ErrorAwareGrid = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'iserror',
})(({ theme, iserror }) => ({
  marginLeft: iserror ? '20px' : '12px',
}));

export const TransactionRow = styled(Grid)(() => ({
  position: 'relative',
}));

export const Badge = styled('span', {
  shouldForwardProp: (prop) => prop !== 'duplicatecolor',
})(({ duplicatecolor }) => ({
  position: 'absolute',
  left: -21,
  top: 22,
  ...(duplicatecolor && {
    background: duplicatecolor,
    height: '16px',
    width: '16px',
    borderRadius: '16px',
  }),
}));
