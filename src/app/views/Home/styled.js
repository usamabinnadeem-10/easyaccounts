import { makeStyles } from '@mui/styles';

import { styled } from '@mui/styles';

export const StyledDiv = styled('div', {
  shouldForwardProp: (prop) => prop !== 'tablet' && prop !== 'mobile',
})(({ theme, tablet, mobile }) => ({
  marginLeft: mobile ? '4px' : tablet ? '24px' : '260px',
  marginTop: '1rem',
  marginRight: mobile ? '4px' : tablet ? '24px' : '50px',
}));

export const useStyles = makeStyles({
  homeOffset: {
    marginLeft: '260px',
    marginTop: '1rem',
    marginRight: '50px',
  },
});
