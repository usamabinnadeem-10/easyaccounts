import { Grid } from '@mui/material';
import { styled } from '@mui/styles';
import { Typography } from '@mui/material';

export const Container = styled(Grid)(({ theme }) => ({
  width: '100%',
  margin: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '10px',
  '& .box': {
    position: 'relative',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.16)',
    borderRadius: 12,
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    height: 200,
    color: '#212121',
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: '0.3s all',
    '&:hover': {
      transition: '0.3s all',
      border: '1px solid #6868FE',
    },
  },
}));

export const BoldText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '15px',
  color: '#212121',
  margin: 0,
}));
export const GreyText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '15px',
  color: '#5d636b',
  margin: 0,
}));
