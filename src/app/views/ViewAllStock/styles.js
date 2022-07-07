import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '0.8rem 1.6rem',
    [theme.breakpoints.down('md')]: {
      padding: '0',
    },
    '@media print': {
      width: '100%',
      padding: '0.8rem 0.8rem',
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
}));

export const selectStyles = () => {
  return {
    menu: (provided, state) => ({
      ...provided,
      zIndex: 100,
    }),
  };
};
