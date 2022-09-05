import React from 'react';
import { useRef } from 'react';

import { useReactToPrint } from 'react-to-print';

import { Button } from '@mui/material';
import { Grid } from '@mui/material';

import { useStyles } from './styles';
import { StyledGrid } from './styled';

const Printable = ({ children, disablePrint, documentTitle }) => {
  const classes = useStyles();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: documentTitle,
  });
  return (
    <StyledGrid container direction='column'>
      <Button
        disabled={disablePrint}
        size='small'
        onClick={handlePrint}
        color='secondary'>
        Print
      </Button>
      <div ref={componentRef} className={classes.root}>
        {children}
      </div>
    </StyledGrid>
  );
};

export default Printable;
