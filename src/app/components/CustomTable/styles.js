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
    [theme.breakpoints.down('md')]: {
      fontSize: '10px',
    },
  },
  rowCell: {
    maxWidth: '200px',
    minWidth: '100px',
    borderBottom: '0.5px solid rgba(105, 105, 105, 0.2)',
    overflowWrap: 'anywhere',
    [theme.breakpoints.down('md')]: {
      minWidth: '50px',
      width: '50px',
      fontSize: '10px',
      padding: '2px',
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
