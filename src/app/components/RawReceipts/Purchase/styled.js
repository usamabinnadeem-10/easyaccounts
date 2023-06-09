import { makeStyles } from '@mui/styles';

import { styled } from '@mui/styles';
import { Typography, Paper, Box } from '@mui/material';

export const Wrapper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'tablet' && prop !== 'mobile',
})(({ theme, tablet, mobile }) => ({
  padding: '20px',
  borderRadius: 8,
  backgroundColor: 'rgba(105, 105, 105, 0.03)',
}));

export const MetaWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  marginBottom: '16px',
  paddingBottom: '16px',
  borderBottom: '1px solid rgba(0,0,0,0.1)',
}));

export const MetaFieldWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const MetaKey = styled(Typography)(() => ({
  width: 100,
}));

export const AllLotsWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}));

export const LotWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}));

// export const LotNumber = styled(Typography)(() => ({
//   display: 'flex',
//   flexDirection: 'column',
//   gap: 2,
// }));
