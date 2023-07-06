import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  column: {
    display: 'flex',
    flexDirection: 'column',
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
