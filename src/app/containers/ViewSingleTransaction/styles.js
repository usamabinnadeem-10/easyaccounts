import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  transactionWrapper: {
    // width: '57vw',
    padding: '0.8rem 1.6rem',
    borderRadius: '0.6rem',
    backgroundColor: 'rgba(105, 105, 105, 0.03)',
    // '@media (max-width: 750px)': {
    //   width: '100vw',
    //   padding: '4px',
    // },
    // '@media print': {
    //   width: '100vw !important',
    //   padding: '0.8rem 1.6rem',
    // },
  },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem 0',
    borderBottom: '1px solid rgba(105, 105, 105, 0.3)',
  },
  metaItem: {
    display: 'flex',
  },
  table: {
    padding: '1rem 0.8rem',
  },
  total: {
    marginTop: '0.8rem',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  cancelledTransactionWrapper: {
    backgroundColor: 'rgba(245, 51, 51, 0.5)',
  },
});
