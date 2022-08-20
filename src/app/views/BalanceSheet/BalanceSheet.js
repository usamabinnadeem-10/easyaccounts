import React from 'react';
import { useState } from 'react';

import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

import CustomFilters from '../../containers/CustomFilters';
import Heading from '../../components/Heading';
import ViewWrapper from '../../components/ViewWrapper';
import Printable from '../../containers/Printable';

import { StyledPaper, AssetsWrapper, LiabilitesEquityWrapper } from './styled';
import { FILTERS } from './filters';
import { formatBalanceSheet } from './utils';

import { REPORTS_APIS } from '../../../constants/restEndPoints';

import { formatCurrency } from '../../utilities/stringUtils';

const BalanceSheet = () => {
  const [balanceSheetData, setBalanceSheetData] = useState(null);

  const handleSearch = (values) => {
    setBalanceSheetData(formatBalanceSheet(values));
  };

  return (
    <Grid container direction='column'>
      <Heading heading='Balance Sheet' />
      <CustomFilters
        api={REPORTS_APIS.BALANCE_SHEET}
        filters={FILTERS}
        onSearch={handleSearch}
      />
      <ViewWrapper overridewidth width='100%'>
        <Printable
          documentTitle={`Balance Sheet ${balanceSheetData?.date}`}
          disablePrint={!balanceSheetData}>
          <StyledPaper>
            <Typography sx={{ mb: 3 }} variant='h5'>
              Balance Sheet
            </Typography>
            <Typography sx={{ mb: 2 }} variant='subtitle'>
              {balanceSheetData?.date}
            </Typography>
            {balanceSheetData ? (
              <Grid container>
                <AssetsWrapper item xs={12} sm={6}>
                  <Grid
                    sx={{ height: '100%' }}
                    container
                    direction='column'
                    justifyContent='space-between'>
                    <Grid>
                      <Typography sx={{ mb: 1 }} variant='subtitle1'>
                        Assets
                      </Typography>
                      {balanceSheetData?.assets.map((a) => {
                        return (
                          <Grid container justifyContent='space-between'>
                            <Typography variant='body2'>{a.label}</Typography>
                            <Typography variant='body2'>
                              {formatCurrency(a.value)}
                            </Typography>
                          </Grid>
                        );
                      })}
                    </Grid>
                    <Grid
                      sx={{ mt: 3 }}
                      container
                      justifyContent='space-between'>
                      <Typography variant='h6'>Total</Typography>
                      <Typography variant='h6'>
                        {formatCurrency(balanceSheetData.totals.assets)}
                      </Typography>
                    </Grid>
                  </Grid>
                </AssetsWrapper>
                <LiabilitesEquityWrapper sx={{ pl: 3 }} item xs={12} sm={6}>
                  <Grid
                    sx={{ height: '100%' }}
                    container
                    justifyContent='space-between'
                    direction='column'>
                    <Grid>
                      <Grid sx={{ mb: 5 }}>
                        <Typography sx={{ mb: 1 }} variant='subtitle1'>
                          Liabilites
                        </Typography>
                        {balanceSheetData?.liabilities.map((a) => {
                          return (
                            <Grid container justifyContent='space-between'>
                              <Typography variant='body2'>{a.label}</Typography>
                              <Typography variant='body2'>
                                {formatCurrency(a.value)}
                              </Typography>
                            </Grid>
                          );
                        })}
                      </Grid>
                      <Typography sx={{ mb: 1 }} variant='subtitle1'>
                        Owner's Equity
                      </Typography>
                      {balanceSheetData?.equity.map((a) => {
                        return (
                          <Grid container justifyContent='space-between'>
                            <Typography variant='body2'>{a.label}</Typography>
                            <Typography variant='body2'>
                              {formatCurrency(a.value)}
                            </Typography>
                          </Grid>
                        );
                      })}
                    </Grid>
                    <Grid
                      sx={{ mt: 3 }}
                      container
                      justifyContent='space-between'>
                      <Typography variant='h6'>Total</Typography>
                      <Typography variant='h6'>
                        {formatCurrency(
                          balanceSheetData.totals.equity +
                            balanceSheetData.totals.liabilities
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </LiabilitesEquityWrapper>
              </Grid>
            ) : (
              <></>
            )}
          </StyledPaper>
        </Printable>
      </ViewWrapper>
    </Grid>
  );
};

export default BalanceSheet;
