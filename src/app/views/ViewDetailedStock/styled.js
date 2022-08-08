import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { styled } from '@mui/styles';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';

export const StyledGrid = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'mt' && prop !== 'mb',
})(({ theme, mt, mb }) => ({
  display: 'flex',
  flexDirection: 'column',
  ...(mt && {
    marginTop: `${mt}px`,
  }),
  ...(mb && {
    marginBottom: `${mb}px`,
  }),
}));

export const Heading = styled(Typography)(({ theme }) => ({}));

export const StyledButton = styled(Button)(({ theme }) => ({}));

export const StyledInput = styled(TextField)(({ theme }) => ({
  marginLeft: theme.spacing(4),
}));

export const Cell = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'textColor',
})(({ theme, textColor }) => ({
  color: textColor,
}));
