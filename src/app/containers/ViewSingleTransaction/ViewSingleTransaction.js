import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useMemo } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useLocation } from "react-router";

import { useReactToPrint } from "react-to-print";

import { Button } from "@mui/material";

import CustomLoader from "../../components/CustomLoader/CustomLoader";
import CustomTable from "../../components/CustomTable/CustomTable";

import PrintIcon from "@mui/icons-material/Print";
import { Box } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { useStyles } from "./styles";

import {
  getSingleTransaction,
  setFetchedFalse,
} from "../../../store/transactions/actions";

import { getMeta, isTransactionAvailable, formatTransaction } from "./utils";
import { DB } from "../../../constants/db";
import { getColumns } from "./constants";

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
  const componentRef = useRef();

  const [ID, setID] = useState(uuid || transactionID);
  const [transaction, setTransaction] = useState(null);
  const [total, setTotal] = useState(0.0);
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
          ID
        );
        if (!isTransaction) {
          dispatch(getSingleTransaction(ID));
        } else {
          setTransaction(
            formatTransaction(isTransaction, warehouses, products)
          );
          setLoading(false);
        }
      } else {
        setTransaction(
          formatTransaction(transactionData, warehouses, products)
        );
        setLoading(false);
      }
    }

    return () => {
      dispatch(setFetchedFalse());
    };
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
          (element) => element.id === ID
        )[0];
        setTransaction(formatTransaction(current, warehouses, products));
        setLoading(false);
      }
    }
  }, [transactions.fetched]);

  useEffect(() => {
    if (transaction) {
      setTotal(
        transaction.transaction_detail.reduce(
          (prev, curr) => prev + curr.amount,
          0
        )
      );
    }
  }, [transaction]);

  return (
    <>
      {loading ? (
        <CustomLoader pageLoader loading={loading} />
      ) : (
        <div ref={componentRef} className={classes.root}>
          <Box
            sx={{
              position: "absolute",
              right: -15,
              top: -10,
              displayPrint: "none",
            }}
          >
            <Tooltip title="Print" arrow>
              <IconButton onClick={handlePrint} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "purple" }}>
                  <PrintIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <div
            id="transaction-wrapper"
            className={`${classes.transactionWrapper}`}
          >
            <div className={classes.meta}>
              {metaItems.map((field, index) => {
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
              sx={{ displayPrint: "none" }}
              variant="contained"
              size="small"
              onClick={() => setGatePassView(!gatePassView)}
            >
              {`${gatePassView ? "Normal view" : "Gate Pass View"}`}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewSingleTransaction;
