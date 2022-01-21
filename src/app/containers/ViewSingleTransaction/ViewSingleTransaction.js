import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import CustomLoader from "../../components/CustomLoader/CustomLoader";
import CustomTable from "../../components/CustomTable/CustomTable";

// import { Tooltip } from "@mui/material";
// import { IconButton } from "@mui/material";
// import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { useStyles } from "./styles";

import {
  getSingleTransaction,
  setFetchedFalse,
} from "../../../store/transactions/actions";

import { getMeta } from "./utils";
import { DB } from "../../../constants/db";
import { COLUMNS } from "./constants";
import {findItemInArray} from "../../../utils/arrayUtils";

// import { print } from "../../../utils/print";

function ViewSingleTransaction({
  transactionID,
  dontFetch = false,
  transactionData = null,
}) {
  const { uuid } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [ID, setID] = useState(uuid || transactionID);
  const [transaction, setTransaction] = useState({});
  const [total, setTotal] = useState(0.0);
  const [loading, setLoading] = useState(true);

  const state = useSelector((state) => state.essentials);
  const transactions = useSelector((state) => state.transactions);

  const formatTransactionDetails = (details) => {
    let newDetails = [];
    details.forEach((detail) => {
      newDetails.push({
        ...detail,
        [DB.WAREHOUSE]: findItemInArray(detail[DB.WAREHOUSE], state.warehouses, 'value').label,
        [DB.PRODUCT]: findItemInArray(detail[DB.PRODUCT], state.products, 'value').label,
      });
    });
    return newDetails;
  };

  const formatTransaction = (transaction) => {
    return {
      ...transaction,
      quantity: transaction.transaction_detail.reduce((prevValue, currentValue) => prevValue + currentValue.quantity, 0),
      gazaana: transaction.transaction_detail.reduce((prevValue, currentValue) => prevValue + (currentValue.quantity * currentValue.yards_per_piece), 0),
      [DB.TRANSACTION_DETAIL]: formatTransactionDetails(
        transaction.transaction_detail
      ),
      [DB.ACCOUNT_TYPE]: transaction[DB.ACCOUNT_TYPE]?.name,
      [DB.PAID_AMOUNT]: transaction[DB.PAID_AMOUNT],
    }
  }

  useEffect(() => {
    if (!dontFetch) {
      dispatch(
        getSingleTransaction({
          id: ID,
          transactions: transactions.transactions,
          essentials: state,
        })
      );
    } else {
      setTransaction(formatTransaction(transactionData));
      setLoading(false);
    }
    return () => {
      dispatch(setFetchedFalse());
    };
  }, []);

  useEffect(() => {
    if (!dontFetch) {
      if (transactions.fetched) {
        console.log(transactions);
        let current = transactions.transactions.filter(
          (element) => element.id === ID
        )[0];
        setTransaction(formatTransaction(current));
        let amount = 0.0;
        current.transaction_detail.forEach(
          (element) => (amount += element.amount)
        );
        setTotal(amount);
        setLoading(false);
      }
    } else {
      let amount = 0.0;
      transactionData.transaction_detail.forEach(
        (element) => (amount += element.amount)
      );
      setTotal(amount);
    }
  }, [transactions.fetched]);

  return (
    <>
      {loading ? (
        <CustomLoader pageLoader loading={loading} />
      ) : (
        <div className={classes.root}>
          {/* <div className={classes.printIcon}>
            <Tooltip title="Print" arrow>
              <IconButton
                onClick={() => print("transaction-wrapper")}
                sx={{ p: 0 }}
              >
                <Avatar sx={{ bgcolor: "purple" }}>
                  <PrintIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
          </div> */}
          <div
            id="transaction-wrapper"
            className={`${classes.transactionWrapper} ${uuid && classes.wider}`}
          >
            <div className={classes.meta}>
              {getMeta(transaction, state).map((field, index) => {
                return (
                  <div key={index} className={classes.metaItem}>
                    <Typography variant="subtitle2" sx={{ width: 110 }}>
                      {field.label}
                    </Typography>
                    <Typography
                      sx={{ ml: 2, textTransform: "capitalize" }}
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
                columns={COLUMNS}
                data={transaction[DB.TRANSACTION_DETAIL]}
              />
              <div className={classes.total}>
                <Typography align="right" variant="button" fontWeight={900}>
                  Total: PKR {total}/=
                </Typography>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewSingleTransaction;
