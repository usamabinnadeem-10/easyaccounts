import { styled } from '@mui/styles';

export const StyledImage = styled('img', {
  shouldForwardProp: (prop) => prop !== 'darken',
})(({ theme, darken }) => ({
  maxWidth: '100%',
  height: 'auto',
  ...(darken && {
    filter: 'brightness(0.6)',
  }),
  transition: '0.25s',
}));
