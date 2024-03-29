import React from 'react';
import { useState } from 'react';

import moment from 'moment';

import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Chip } from '@mui/material';

import ChequeHistory from '../ChequeHistory';
import ChequeActionMenu from '../ChequeActionMenu';

import { StyledBox } from './styled';
import { StyledGrid } from './styled';
import { AmountBox } from './styled';

import { STATUS_COLORS } from './constants';
import { STATUS_VARIANTS } from './constants';

import { BANKS } from '../../../constants/banks';
import {
  formatCurrency,
  capitalizeFirstLetter,
} from '../../utilities/stringUtils';

const Cheque = ({
  chequeData,
  isPersonal,
  persons,
  accounts,
  viewHistoryButton,
}) => {
  const details = [
    {
      field: 'Serial',
      data: chequeData.serial,
    },
    {
      field: isPersonal ? 'Paid to' : 'From',
      data: persons?.[chequeData.person]?.label,
    },
  ];

  isPersonal &&
    details.push({
      field: 'Bank Account',
      data: accounts?.[chequeData.account_type]?.label,
    });

  const [showDrawer, setShowDrawer] = useState(false);
  const [chequeId, setChequeId] = useState(null);

  const handleClick = () => {
    setChequeId(chequeData.id);
    setShowDrawer(true);
  };

  const findBank = (bank) => {
    return BANKS.filter((curr) => curr.value === bank)[0]?.label;
  };

  return (
    <>
      <ChequeHistory
        open={showDrawer}
        persons={persons}
        accounts={accounts}
        chequeId={chequeId}
        onClose={() => {
          setShowDrawer(false);
          setChequeId(null);
        }}
        isExternal
      />
      <StyledBox>
        <StyledGrid
          container
          justifyContent='space-between'
          alignItems='center'
          gap={2}>
          <Grid item xs={9}>
            <Typography>{findBank(chequeData.bank)}</Typography>
          </Grid>
          <Grid item xs={1}>
            <ChequeActionMenu
              chequeId={chequeData.id}
              chequeStatus={chequeData.status}
              chequeSerial={chequeData.serial}
              isPersonal={isPersonal}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body1'>
              Receive date: {moment(chequeData.date).format('DD-MM-YYYY')}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='body1'>
              Due date: {moment(chequeData.due_date).format('DD-MM-YYYY')}
            </Typography>
          </Grid>
        </StyledGrid>
        <StyledGrid container alignItems='center' bgcolor='#F0F0F0'>
          <Grid item xs={6}>
            <Grid container direction='column'>
              {details.map((detail, index) => (
                <Typography key={index} variant='body1'>
                  {detail.field}: {detail.data}
                </Typography>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container justifyContent='flex-end'>
              <AmountBox>
                <Typography variant='body1'>
                  {formatCurrency(chequeData.amount)}/=
                </Typography>
              </AmountBox>
            </Grid>
          </Grid>
        </StyledGrid>
        <StyledGrid container justify='space-between'>
          <Grid item xs={8}>
            <Typography variant='h6'>{chequeData.cheque_number}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Grid container justifyContent='flex-end'>
              <Chip
                label={capitalizeFirstLetter(chequeData.status).replace(
                  '_',
                  ' '
                )}
                color={STATUS_COLORS[chequeData.status]}
                variant={STATUS_VARIANTS[chequeData.status] || null}
              />
            </Grid>
          </Grid>
        </StyledGrid>
        {!isPersonal && viewHistoryButton && (
          <StyledGrid container>
            <Button size='small' variant='contained' onClick={handleClick}>
              View History
            </Button>
          </StyledGrid>
        )}
      </StyledBox>
    </>
  );
};

export default Cheque;
