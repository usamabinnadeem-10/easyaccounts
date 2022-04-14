import { Modal } from '@mui/material';
import { styled } from '@mui/material';
import { Typography } from '@mui/material';

export const StyledModal = styled(Modal, {
  shouldForwardProp: (prop) => prop !== 'width',
})(({ width }) => ({
  top: '50% !important',
  left: '50% !important',
  width: width ? `${width}px` : '400px',
}));

export const CustomBackground = styled('div')(({ theme }) => ({
  background: '#fff',
  borderRadius: '0.4rem',
  transform: 'translate(-50%, -50%)',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: `0px 3px 6px rgba(0, 0, 0, 0.16)`,
}));

export const Text = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ color }) => ({
  top: '50% !important',
  left: '50% !important',
  marginBottom: '8px',
}));
