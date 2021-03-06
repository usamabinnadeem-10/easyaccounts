import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '75vw',
    padding: '0.8rem 1.6rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: 0,
    },
  },
  selectPerson: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
  },
  table: {
    borderRadius: '0.6rem',
    backgroundColor: 'rgba(105, 105, 105, 0.03)',
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
}));
