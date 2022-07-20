import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  noTableStyles: {
    width: '100%',
    borderSpacing: '0',
  },
  tableWrapper: {
    padding: '1rem 1.2rem',
    borderRadius: '0.4rem',
    width: '100%',
    borderSpacing: '0',
    backgroundColor: 'rgba(105, 105, 105, 0.03)',
  },
  tableHead: {
    textAlign: 'left',
  },
  headCell: {
    padding: '0.6rem 0',
    borderBottom: '0.5px solid rgba(105, 105, 105, 0.3)',
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
      padding: '4px 1px',
      fontWeight: 'bold',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '8px',
      padding: '2px 1px',
      fontWeight: 'bold',
    },
  },
  rowCell: {
    maxWidth: '200px',
    borderBottom: '0.5px solid rgba(105, 105, 105, 0.2)',
    overflowWrap: 'anywhere',
    padding: '4px 0px',
    [theme.breakpoints.down('md')]: {
      maxWidth: '120px',
      fontSize: '12px',
      padding: '2px',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '80px',
      fontSize: '8px',
      padding: '1px',
    },
  },
  hover: {
    cursor: 'pointer',
  },
  pre: { whiteSpace: 'break-spaces' },
  hideInPrint: {
    '@media print': {
      display: 'none !important',
    },
  },
  bordered: {
    border: '0.5px solid rgba(105, 105, 105, 0.3)',
  },
}));
