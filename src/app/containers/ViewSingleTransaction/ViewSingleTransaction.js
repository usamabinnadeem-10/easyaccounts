import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useLocation } from 'react-router';

import { Button } from '@mui/material';

import CustomLoader from '../../components/CustomLoader/CustomLoader';
import CustomTable from '../../components/CustomTable/CustomTable';
import Printable from '../../containers/Printable';

import { Typography } from '@mui/material';
import { useStyles } from './styles';

import {
  getSingleTransaction,
  setFetchedFalse,
} from '../../../store/transactions/actions';

import { getMeta, isTransactionAvailable, formatTransaction } from './utils';
import { DB } from '../../../constants/db';
import { getColumns } from './constants';

function ViewSingleTransaction({
  transactionID,
  dontFetch = false,
  transactionData = null,
  warehouses,
  products,
  accounts,
  persons,
}) {
  const { uuid } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  const [ID, setID] = useState(uuid || transactionID);
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState(getColumns());
  const [gatePassView, setGatePassView] = useState(false);

  const transactions = useSelector((state) => state.transactions);

  const metaItems = useMemo(() => {
    if (transaction) {
      return getMeta(transaction, { persons, accounts }, gatePassView);
    } else {
      return [];
    }
  }, [transaction, persons, accounts, gatePassView]);

  useEffect(() => {
    if (location.state) {
      setTransaction(formatTransaction(location.state, warehouses, products));
      setLoading(false);
    } else {
      if (!dontFetch) {
        let isTransaction = isTransactionAvailable(
          transactions.transactions,
          ID,
        );
        if (!isTransaction) {
          dispatch(getSingleTransaction(ID));
        } else {
          setTransaction(
            formatTransaction(isTransaction, warehouses, products),
          );
          setLoading(false);
        }
      } else {
        setTransaction(
          formatTransaction(transactionData, warehouses, products),
        );
        setLoading(false);
      }
    }

    return () => {
      dispatch(setFetchedFalse());
    };
  }, []);

  useEffect(() => {
    if (gatePassView) {
      setColumns(getColumns(true));
    } else {
      setColumns(getColumns());
    }
  }, [gatePassView]);

  useEffect(() => {
    if (location.state) {
      setTransaction(formatTransaction(location.state, warehouses, products));
      setLoading(false);
    } else {
      if (!dontFetch && transactions.fetched) {
        let current = transactions.transactions.filter(
          (element) => element.id === ID,
        )[0];
        setTransaction(formatTransaction(current, warehouses, products));
        setLoading(false);
      }
    }
  }, [transactions.fetched]);

  return (
    <>
      {loading ? (
        <CustomLoader pageLoader loading={loading} />
      ) : (
        <Printable
          documentTitle={`${transactionData?.serial_type}-${transactionData?.serial}`}
        >
          <div
            id="transaction-wrapper"
            className={`${classes.transactionWrapper} ${
              transactionData.is_cancelled &&
              classes.cancelledTransactionWrapper
            }`}
          >
            <div className={classes.meta}>
              {metaItems.map((field, index) => {
                return (
                  <div key={index} className={classes.metaItem}>
                    <Typography variant="subtitle2" sx={{ width: 110 }}>
                      {field.label}
                    </Typography>
                    <Typography
                      sx={{ ml: 2, textTransform: 'capitalize' }}
                      fontWeight="700"
                    >
                      {field.value}
                    </Typography>
                  </div>
                );
              })}
            </div>
            <div className={classes.table}>
              <CustomTable
                noTableStyles
                columns={columns}
                data={transaction[DB.TRANSACTION_DETAIL]}
              />
              {!gatePassView && (
                <div className={classes.total}>
                  <Typography align="right" variant="body1">
                    {transaction.total}
                  </Typography>
                  <Typography align="right" variant="body1">
                    {`- ${transaction.discount}`}
                  </Typography>
                  <Typography align="right" variant="h6">
                    {transaction.totalAfterDiscount}
                  </Typography>
                </div>
              )}
            </div>
            <Button
              sx={{ displayPrint: 'none' }}
              variant="contained"
              size="small"
              onClick={() => setGatePassView(!gatePassView)}
            >
              {`${gatePassView ? 'Normal view' : 'Gate Pass View'}`}
            </Button>
          </div>
        </Printable>
      )}
    </>
  );
}

export default ViewSingleTransaction;
