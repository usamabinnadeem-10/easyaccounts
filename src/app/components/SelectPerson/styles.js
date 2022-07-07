import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '50vw !important',
    padding: '0.8rem 1.6rem',
    borderRadius: '0.6rem',
    backgroundColor: 'rgba(105, 105, 105, 0.03)',
  },
  people: {
    width: '40%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: '12px',
    },
  },
  container: {
    marginBottom: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '12px',
    },
  },
}));

export const selectCustomStyles = {
  menu: (provided, state) => ({
    ...provided,
    zIndex: 200,
  }),
};
