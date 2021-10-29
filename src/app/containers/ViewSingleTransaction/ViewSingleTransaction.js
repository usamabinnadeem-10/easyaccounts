import React from "react";
import { useState } from "react";
import { useEffect } from "react";

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

import instance from "../../../utils/axiosApi";
import { TRANSACTION_URLS } from "../../../constants/restEndPoints";
import { getURL } from "../../utilities/stringUtils";
import {
  findPerson,
  findWarehouse,
  findProduct,
  findAccountType,
} from "../../views/LedgerTransaction/utils";
import { getMeta } from "./utils";
import { DB } from "../../../constants/db";
import { COLUMNS } from "./constants";
import { print } from "../../../utils/print";

function ViewSingleTransaction() {
  const { uuid } = useParams();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState({});
  const [total, setTotal] = useState(0.0);

  const state = useSelector((state) => state.essentials);

  const formatTransactionDetail = (details) => {
    let formatted = [];
    let amount = 0.0;
    details.forEach((element) => {
      amount += element.amount;
      let product = findProduct(
        element[DB.PRODUCT],
        state.products,
        state.productHeads,
        true
      );
      formatted.push({
        ...element,
        [DB.WAREHOUSE]: findWarehouse(element[DB.WAREHOUSE], state.warehouses)
          .label,
        [DB.PRODUCT]: `${product.head_name} / ${product.label}`,
      });
    });
    setTotal(amount);
    return formatted;
  };

  const formatTransactionData = (transaction, accountType, paidAmount) => {
    let person = findPerson(
      transaction.person,
      state.suppliers,
      state.customers
    );
    return {
      ...transaction,
      [DB.PAID_AMOUNT]: paidAmount,
      [DB.ACCOUNT_TYPE]: accountType
        ? findAccountType(accountType.id, state.accountTypes).label
        : null,
      [DB.PERSON]: person.label,
      [DB.PERSON_TYPE]: person.person_type,
      [DB.TRANSACTION_DETAIL]: formatTransactionDetail(
        transaction.transaction_detail
      ),
    };
  };

  useEffect(() => {
    instance
      .get(getURL(TRANSACTION_URLS.GET_TRANSACTION, "uuid", uuid))
      .then((res) => {
        setTransaction(
          formatTransactionData(
            res.data.transaction,
            res.data.account_type,
            res.data.paid_amount
          )
        );
        setLoading(false);
      });
  }, []);

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
          <div id="transaction-wrapper" className={classes.transactionWrapper}>
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
