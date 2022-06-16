import React from 'react';

import { Typography } from '@mui/material';

import { useStyles } from './styles';
import { formatCurrency } from '../../utilities/stringUtils';

const AccountTypeCard = ({ accountName, balance }) => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <Typography variant='body2'>
        {accountName === 'null' ? 'Account Payable' : accountName}
      </Typography>
      <Typography variant='h6'>PKR {formatCurrency(balance)}/=</Typography>
    </div>
  );
};

export default AccountTypeCard;
