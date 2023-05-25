import { styled } from '@mui/styles';

export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  columnGap: theme.spacing(2),
  alignItems: 'center',
  border: '1px solid rgba(0,0,0,0.23)',
  borderRadius: '4px',
}));
