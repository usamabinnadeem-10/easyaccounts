import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import CustomLoader from "../../components/CustomLoader/CustomLoader";
import CustomTable from "../../components/CustomTable/CustomTable";

import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { useStyles } from "./styles";

import PrintIcon from "@mui/icons-material/Print";

import {
  getSingleTransaction,
  setFetchedFalse,
} from "../../../store/transactions/actions";

import { getMeta } from "./utils";
import { DB } from "../../../constants/db";
import { COLUMNS } from "./constants";
import { print } from "../../../utils/print";

function ViewSingleTransaction({ transactionID }) {
  const { uuid } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [ID, setID] = useState(uuid || transactionID);
  const [transaction, setTransaction] = useState({});
  const [total, setTotal] = useState(0.0);
  const [loading, setLoading] = useState(true);

  const state = useSelector((state) => state.essentials);
  const transactions = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(
      getSingleTransaction({
        id: ID,
        transactions: transactions.transactions,
        essentials: state,
      })
    );
    return () => {
      dispatch(setFetchedFalse());
    };
  }, []);

  useEffect(() => {
    if (transactions.fetched) {
      let current = transactions.transactions.filter(
        (element) => element.id === ID
      )[0];
      setTransaction(current);
      let amount = 0.0;
      current.transaction_detail.forEach(
        (element) => (amount += element.amount)
      );
      setTotal(amount);
      setLoading(false);
    }
  }, [transactions.fetched]);

  return (
    <>
      {loading ? (
        <CustomLoader pageLoader loading={loading} />
      ) : (
        <div className={classes.root}>
          <div className={classes.printIcon}>
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
          </div>
          <div
            id="transaction-wrapper"
            className={`${classes.transactionWrapper} ${uuid && classes.wider}`}
          >
            <div className={classes.meta}>
              {getMeta(transaction).map((field, index) => {
                return (
                  <div key={index} className={classes.metaItem}>
                    <Typography variant="subtitle2" sx={{ width: 100 }}>
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
