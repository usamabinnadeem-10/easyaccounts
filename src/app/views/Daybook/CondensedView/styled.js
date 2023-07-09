import { styled } from '@mui/styles';

import { Box } from '@mui/material';
import { Typography } from '@mui/material';

export const Wrapper = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(105,105,105,0.03)',
  display: 'flex',
  padding: '12px',
  borderRadius: '4px',
  marginTop: '12px',
}));

export const Credits = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  paddingLeft: '12px',
  gap: '12px',
}));

export const Debits = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRight: '2px solid black',
  flex: 1,
  gap: '12px',
  paddingRight: '12px',
}));

export const Section = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  paddingBottom: '12px',
  borderBottom: '1px solid rgba(0,0,0,0.2)',
}));

export const SectionHeader = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: 'rgba(0,0,0,0.6)',
}));

export const Row = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'end',
  gap: '8px',
}));

export const RowText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
}));
