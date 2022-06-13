import { styled } from '@mui/styles';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

export const TableCell = styled(Box)(({ theme }) => ({
  border: '1px solid black',
  minHeight: '32px',
  padding: '4px',
}));

export const CellText = styled(Typography)(({ theme }) => ({
  margin: 'auto',
}));

export const StyledImage = styled('img')(({ theme }) => ({
  maxWidth: '30%',
  height: 'auto',
  borderRadius: '16px',
}));

export const ImagesContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2, 0),
  alignItems: 'center',
  //   justifyContent: 'space-evenly',
}));
