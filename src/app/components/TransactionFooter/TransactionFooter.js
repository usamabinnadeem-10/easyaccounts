import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import CustomLoader from '../CustomLoader/CustomLoader';

import { FastField } from 'formik';
import { FormTextField } from '../../utilities/formUtils';

import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import EmailIcon from '@mui/icons-material/Email';
// import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

import { formatCurrency } from '../../utilities/stringUtils';

function TransactionFooter({
  values,
  transactionFooter,
  loading,
  makeTransaction,
  transaction,
}) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalGazaana, setTotalGazaana] = useState(0);

  useEffect(() => {
    let amount = 0;
    let qty = 0;
    let gaz = 0;
    values.transaction_detail.forEach((value, index) => {
      let q = parseFloat(value.quantity) || 0;
      let y = parseFloat(value.yards_per_piece?.value) || 0;
      let r = parseFloat(value.rate) || 0;
      qty += q;
      gaz += q * y;
      amount += q * y * r;
    });
    let d = parseFloat(values.discount) || 0;
    setTotalAmount(amount - d);
    setTotalQuantity(qty);
    setTotalGazaana(gaz);
  }, [values]);

  return (
    <>
      <Grid container justifyContent='flex-end' sx={{ pb: 2, mt: 4 }}>
        <Grid sx={{ width: 'max-content' }} container direction='column'>
          {transactionFooter.map((field, index) => {
            return (
              <FastField
                name={field.name}
                component={FormTextField}
                key={index}
                disabled={!field.visible}
                label={field.placeholder}
                // type={field.type}
                type='number'
                multiline
                variant='outlined'
                size='small'
                placeholder={field.placeholder}
                sx={{
                  width: 200,
                  my: 1,
                }}
              />
            );
          })}
        </Grid>
      </Grid>

      <Grid container justifyContent='space-between'>
        <Grid item xs={6}>
          <Typography variant='subtitle'>
            Items : {values.transaction_detail.length}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction='column' align='right'>
            <Typography variant='h6' color={totalAmount < 0 && 'error'}>
              PKR : {formatCurrency(totalAmount) || 0} /=
            </Typography>
            <Typography variant='h6'>
              Gazaana : {formatCurrency(totalGazaana) || 0} yards
            </Typography>
            <Typography variant='h6'>
              Thaan : {formatCurrency(totalQuantity) || 0}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container sx={{ my: 2 }}>
        {loading ? (
          <CustomLoader loading={loading} />
        ) : (
          <Button
            endIcon={transaction ? <EditIcon /> : <EmailIcon />}
            variant='contained'
            sx={{ fontWeight: 900, mr: 2 }}
            onClick={makeTransaction}>
            {transaction ? 'Edit' : 'Finalize'}
          </Button>
        )}
      </Grid>
    </>
  );
}

export default TransactionFooter;
