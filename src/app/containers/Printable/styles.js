import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    '@media print': {
      width: '100% !important',
    },
  },
}));
