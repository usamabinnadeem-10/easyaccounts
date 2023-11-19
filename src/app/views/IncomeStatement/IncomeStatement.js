import React from 'react';
import { useState, useMemo } from 'react';

import { useSelector } from 'react-redux';

import { Divider } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

import CustomFilters from '../../containers/CustomFilters';
import Heading from '../../components/Heading';
import ViewWrapper from '../../components/ViewWrapper';
import Printable from '../../containers/Printable';

import { REPORTS_APIS } from '../../../constants/restEndPoints';

import { FILTERS } from './filters';

import { StyledPaper, IncomeDataWrapper } from './styled';
import { formatIncomeStatement } from './utils';

import {
  formatCurrency,
  capitalizeFirstLetter,
} from '../../utilities/stringUtils';

export const LineItem = ({ label, value, padLeft, minus }) => {
  let textVariant = padLeft ? 'body2' : 'body1';
  return (
    <Grid
      sx={{ mb: 1, pl: padLeft ? 2 : '0rem' }}
      container
      alignItems="center"
      justifyContent="space-between"
      gap={2}
    >
      <Typography variant={textVariant} fontWeight={padLeft ? 400 : 700}>
        {label}
      </Typography>
      <Typography variant={textVariant}>
        {minus && !!value ? '-' : ''}
        {value !== null && !!value ? formatCurrency(value) : '-'}
      </Typography>
    </Grid>
  );
};

const DIVIDER = <Divider sx={{ width: '100%', mb: 1 }} />;

const IncomeStatement = () => {
  const [incomeData, setIncomeData] = useState(null);
  const expenseAccounts = useSelector(
    (state) => state.essentials.expenseAccounts,
  );

  const handleSearch = (data) => {
    setIncomeData(formatIncomeStatement(data, expenseAccounts));
  };

  return (
    <>
      <Heading heading="Income Statement" />
      <CustomFilters
        api={REPORTS_APIS.INCOME_STATEMENT}
        filters={FILTERS}
        onSearch={handleSearch}
      />
      <ViewWrapper overridewidth width="100%">
        <Printable
          disablePrint={!incomeData}
          documentTitle={`Income Statement ${incomeData?.period}`}
        >
          <StyledPaper>
            <Typography variant="h5">Income Statement</Typography>
            {incomeData && (
              <>
                <Typography variant="subtitle">{incomeData.period}</Typography>
                <IncomeDataWrapper container>
                  <LineItem label="Revenue" value={incomeData.revenue} />
                  <LineItem
                    label="Cost of good sold"
                    value={incomeData.cogs}
                    minus
                  />
                  {DIVIDER}
                  <LineItem
                    label="Gross profit"
                    value={incomeData.revenue - incomeData.cogs}
                  />
                  {DIVIDER}
                  <LineItem label="Expenses" value={''} />
                  {incomeData.expenses.map((e) => {
                    return <LineItem padLeft label={e.label} value={e.total} />;
                  })}
                  <LineItem
                    label="Total expenses"
                    value={incomeData.totalExpenses}
                    minus
                  />
                  {DIVIDER}
                  <LineItem
                    label="Net profit"
                    value={
                      incomeData.revenue -
                      (incomeData.cogs + incomeData.totalExpenses)
                    }
                  />
                  <LineItem
                    label="Asset profit"
                    value={incomeData.asset_profit}
                  />
                  {DIVIDER}
                  <LineItem
                    label="Total profit"
                    value={
                      incomeData.revenue +
                      incomeData.asset_profit -
                      (incomeData.cogs + incomeData.totalExpenses)
                    }
                  />
                </IncomeDataWrapper>
              </>
            )}
          </StyledPaper>
        </Printable>
      </ViewWrapper>
    </>
  );
};

export default IncomeStatement;
