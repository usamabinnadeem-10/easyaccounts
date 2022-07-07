import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  dateWrapper: {
    marginTop: '1rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '12px',
    },
  },
}));
