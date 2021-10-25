import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  getAllSuppliers,
  getAllEssentials,
} from "../../../store/essentials/actions";

import Transaction from "../../containers/Transaction/Transaction";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

import { useStyles } from "./styles";

import * as constants from "./constants";

function SupplierTransaction() {
  let classes = useStyles();
  const dispatch = useDispatch();

  const state = useSelector((state) => state.essentials);

  useEffect(() => {
    !state.downloadedSuppliers && dispatch(getAllSuppliers());
    !state.downloadedRest && dispatch(getAllEssentials());
  }, []);

  const [metaData, setMetaData] = useState({
    user: null,
    date: null,
    transactionType: constants.TRANSACTION_TYPES[0].value,
  });

  const updateMetaData = (property, value) => {
    setMetaData({
      ...metaData,
      [property]: value,
    });
  };

  return (
    <div className={classes.root}>
      {state.downloadedSuppliers ? (
        <Transaction
          tableMeta={constants.TABLE_META}
          updateMetaData={updateMetaData}
          defaultRow={constants.DEFAULT_ROW}
          transactionTypes={constants.TRANSACTION_TYPES}
          metaConstants={constants.META_CONSTANTS}
          personIdentifier="Supplier"
          natures={constants.NATURES}
          options={{
            people: state.suppliers,
            warehouse: state.warehouses,
            color: state.products,
            product: state.productHeads,
          }}
          selectedOptions={{
            currentPerson: metaData.user,
            currentTransactionType: metaData.transactionType,
            currentDate: metaData.date,
          }}
        />
      ) : (
        <CustomLoader loading={!state.downloadedSuppliers} pageLoader />
      )}
    </div>
  );
}

export default SupplierTransaction;
