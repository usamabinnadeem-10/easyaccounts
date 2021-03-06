import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '75vw',
    padding: '0.8rem 1.6rem',
    borderRadius: '0.6rem',
    backgroundColor: 'rgba(105, 105, 105, 0.03)',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '12px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  table: {
    margin: '1.6rem 0',
    marginBottom: '48px',
  },
  ledgerWrapper: {
    '@media print': {
      margin: '12px',
    },
  },
}));
