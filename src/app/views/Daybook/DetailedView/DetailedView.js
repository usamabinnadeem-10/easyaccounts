import React, { useMemo } from 'react';

import ChequeList from '../../../components/ChequeList';
import PaymentList from '../../../views/PaymentList';
import ViewExpenses from '../../ViewExpenses';
import ChequeHistoryTable from '../../../components/ChequeHistoryTable';
import CustomTable from '../../../components/CustomTable';

import { Typography } from '@mui/material';

import { useStyles } from './styles';
import { getLedgerDetailTable } from './utils';

const DetailedView = ({ daybookData, ...props }) => {
  const classes = useStyles();

  let ledgerDetailColumns = useMemo(
    () => getLedgerDetailTable(props.persons, props.accounts),
    [props],
  );

  return (
    <div className={classes.column}>
      {daybookData?.expenses?.length > 0 && (
        <>
          <Typography variant="button" fontWeight={900} sx={{ mt: 1, mb: 3 }}>
            Expenses
          </Typography>
          <ViewExpenses
            {...props}
            daybookView
            defaultExpenses={daybookData.expenses}
          />
        </>
      )}

      {daybookData.payments.length > 0 && (
        <>
          <Typography variant="button" fontWeight={900} sx={{ mt: 3, mb: 1 }}>
            Payments
          </Typography>
          <PaymentList
            {...props}
            daybookView
            daybookPayments={daybookData.payments}
            // defaultLedgers={daybookData.ledgers}
          />
        </>
      )}
      {daybookData.ledgerDetails.length > 0 && (
        <>
          <Typography variant="button" fontWeight={900} sx={{ mt: 3, mb: 1 }}>
            Ledger Entries
          </Typography>
          <CustomTable
            data={daybookData.ledgerDetails}
            columns={ledgerDetailColumns}
          />
        </>
      )}
      {daybookData.externalCheques.length > 0 && (
        <>
          <Typography variant="button" fontWeight={900} sx={{ mt: 3, mb: 1 }}>
            Party Cheques
          </Typography>
          <ChequeList
            isPersonal={false}
            cheques={daybookData.externalCheques}
            persons={props.persons}
            accounts={props.accounts}
          />
        </>
      )}
      {daybookData.externalChequesHistory.length > 0 && (
        <>
          <Typography variant="button" fontWeight={900} sx={{ mt: 3, mb: 1 }}>
            Party Cheques History
          </Typography>
          <ChequeHistoryTable
            historyData={daybookData.externalChequesHistory}
            accounts={props.accounts}
            persons={props.persons}
          />
        </>
      )}
      {daybookData.personalCheques.length > 0 && (
        <>
          <Typography variant="button" fontWeight={900} sx={{ mt: 3, mb: 1 }}>
            Personal Cheques
          </Typography>
          <ChequeList
            isPersonal={true}
            cheques={daybookData.personalCheques}
            persons={props.persons}
            accounts={props.accounts}
          />
        </>
      )}
    </div>
  );
};

export default DetailedView;
