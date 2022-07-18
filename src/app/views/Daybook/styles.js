import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '75vw',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '2rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  header: {
    justifyContent: 'space-between',
    marginBottom: '2rem',
  },
  accountTypesWrapper: {
    display: 'flex',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    rowGap: '20px',
  },
}));
