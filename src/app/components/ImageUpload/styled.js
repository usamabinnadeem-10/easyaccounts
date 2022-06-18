import { styled } from '@mui/styles';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';

export const Box = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '4px',
  border: '1px solid rgba(0,0,0,0.25)',
}));

export const ButtonsContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  justifyContent: 'center',
  alignContent: 'center',
}));

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'marginright',
})(({ theme, marginright }) => ({
  minWidth: '175px !important',
  ...(marginright && {
    marginRight: `${theme.spacing(2)} !important`,
  }),
}));

export const ImagesWrapper = styled(Grid)(({ theme }) => ({
  justifyContent: 'space-between',
}));

export const Image = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const ImageButtonWrapper = styled(Grid)(({ theme }) => ({
  justifyContent: 'center',
}));
