import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import TransactionFooter from "../../components/TransactionFooter/TransactionFooter";
import TransactionHeader from "../../components/TransactionHeader/TransactionHeader";
import TransactionTableBody from "../../components/TransactionTableBody/TransactionTableBody";
import TransactionTableHeader from "../../components/TransactionTableHeader/TransactionTableHeader";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import * as constants from "./constants";
import { TRANSACTION_URLS } from "../../../constants/restEndPoints";

import instance from "../../../utils/axiosApi";

import { useStyles } from "./styles";

const Transaction = (props) => {
  const {
    tableMeta,
    updateMetaData,
    defaultRow,
    transactionTypes,
    metaConstants,
    personIdentifier,
    showAccountTypes,
    options,
    selectedOptions,
    natures,
  } = props;

  let classes = useStyles();

  const [selected, setSelected] = useState([]);
  const [tableData, setTableData] = useState([defaultRow]);
  const [snackbarState, setSnackbarState] = useState({});
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    constants.ERROR_DEFAULTS.ROW_INCOMPLETE
  );

  const TRANSACTION_FOOTER = [
    {
      placeholder: "Discount",
      action: setDiscount,
      value: discount,
      visible: true,
    },
    {
      placeholder: "Paid Amount",
      action: setPaidAmount,
      value: paidAmount,
      visible: showAccountTypes,
    },
  ];

  useEffect(() => {
    let total = 0.0;
    tableData.forEach((row) => {
      total += row.total;
    });
    setTotal(total - discount);
  }, [tableData, discount]);

  // add a new row to the transaction table
  const addRow = () => {
    if (canAddRow()) {
      let newTableData = [...tableData];
      let lastRow = tableData[tableData.length - 1];
      let newRow = {
        ...constants.DEFAULT_ROW,
        product: lastRow?.product ?? null,
        quantity: lastRow?.quantity ?? 0,
        warehouse: lastRow?.warehouse ?? null,
        rate: lastRow?.rate ?? 0,
        total: lastRow?.total ?? 0,
      };
      newTableData.push(newRow);
      setTableData(newTableData);
    } else {
      openSnackbar(true, "error", errorMessage);
    }
  };

  // open snackbar
  const openSnackbar = (open, severity, message) => {
    setSnackbarState({
      open,
      severity,
      message,
    });
  };

  // close snackbar
  const closeSnackbar = () => {
    setSnackbarState({
      ...snackbarState,
      open: false,
    });
  };

  // check if user is allowed to enter a new row to the transaction table
  const canAddRow = () => {
    let copyTableData = JSON.parse(JSON.stringify(tableData));
    let lastRow = copyTableData[copyTableData.length - 1];
    if (tableData.length === 0) {
      return true;
    }
    if (lastRow[constants.DEFAULTS.TOTAL] <= 0) {
      setErrorMessage(constants.ERROR_DEFAULTS.LOW_TOTAL);
      return false;
    }
    delete lastRow.selected;
    delete lastRow.total;
    for (const key in lastRow) {
      if (!lastRow[key]) {
        setErrorMessage(constants.ERROR_DEFAULTS.ROW_INCOMPLETE);
        return false;
      }
    }
    return true;
  };

  // handle deleting the selected rows
  const deleteRows = () => {
    let elementsToDelete = selected.sort();
    let newTableData = [...tableData];

    while (elementsToDelete.length) {
      let indexToPop = elementsToDelete.pop();
      newTableData.splice(indexToPop, 1);
    }
    setTableData(newTableData);
    setSelected([]);
  };

  // update state with the values entered by user
  const handleStateChange = (val, index, column) => {
    let newState = [...tableData];
    newState[index] = {
      ...newState[index],
      [column]: val,
      color:
        column === constants.DEFAULTS.PRODUCT
          ? null
          : column === constants.DEFAULTS.COLOR
          ? val
          : newState[index][constants.DEFAULTS.COLOR],
    };
    let row = newState[index];
    row[constants.DEFAULTS.TOTAL] =
      row[constants.DEFAULTS.RATE] *
        row[constants.DEFAULTS.QUANTITY] *
        row[constants.DEFAULTS.COLOR]?.["basic_unit"] || 0;
    setTableData(newState);
  };

  // add the selected rows to selected array
  const handleSetSelected = (row, checked) => {
    let newSelected = [...selected];
    if (!checked) {
      newSelected = newSelected.filter((current) => current !== row);
    } else {
      newSelected.push(row);
    }
    handleStateChange(checked, row, constants.DEFAULTS.SELECTED);
    setSelected(newSelected);
  };

  // errors that can occur upon finalizing the transaction
  const FINALIZE_ERRORS = [
    {
      isError: !selectedOptions.currentPerson,
      description: constants.ERROR_DEFAULTS.NO_PERSON + personIdentifier,
    },
    {
      isError:
        selectedOptions.currentTransactionType === "paid" &&
        !selectedOptions.currentAccountType,
      description: constants.ERROR_DEFAULTS.NO_ACCOUNT,
    },
    {
      isError: tableData.length === 0,
      description: constants.ERROR_DEFAULTS.NO_ROW,
    },
    {
      isError: canAddRow,
      description: constants.ERROR_DEFAULTS.ROW_INCOMPLETE,
    },
    {
      isError: selectedOptions.currentTransactionType === "paid" && !paidAmount,
      description: constants.ERROR_DEFAULTS.NO_PAID_AMOUNT,
    },
  ];

  // finalize transaction or save as draft
  const makeTransaction = (draft = false) => {
    for (let i = 0; i < FINALIZE_ERRORS.length; i++) {
      let check = FINALIZE_ERRORS[i].isError;
      let isError = typeof check === "function" ? !check() : check;
      if (isError) {
        openSnackbar(true, "error", FINALIZE_ERRORS[i].description);
        return;
      }
    }
    setLoading(true);
    let transaction = {
      nature: natures[selectedOptions.currentTransactionType],
      person: selectedOptions.currentPerson.value,
      draft: draft,
      type: selectedOptions.currentTransactionType,
      transaction_detail: tableData.map((data, index) => {
        return {
          product: data.color.value,
          quantity: data.quantity,
          rate: data.rate,
          warehouse: data.warehouse.value,
          amount: data.total,
        };
      }),
    };
    if (selectedOptions.currentTransactionType === "paid") {
      transaction["paid"] = true;
      transaction["paid_amount"] = paidAmount;
      transaction["account_type"] = selectedOptions.currentAccountType?.value;
    }
    if (selectedOptions.currentDate) {
      transaction[
        "date"
      ] = `${selectedOptions.currentDate.year}-${selectedOptions.currentDate.month}-${selectedOptions.currentDate.day}`;
    }
    instance
      .post(TRANSACTION_URLS.CREATE_TRANSACTION, transaction)
      .then((res) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <div className={classes.root}>
      <TransactionHeader
        personIdentifier={personIdentifier}
        selectedOptions={selectedOptions}
        options={options}
        updateMetaData={updateMetaData}
        metaConstants={metaConstants}
        showAccountTypes={showAccountTypes}
        transactionTypes={transactionTypes}
      />

      <TableContainer component={Paper} sx={{ my: 3, overflow: "visible" }}>
        <Table>
          <TransactionTableHeader
            tableMeta={tableMeta}
            selected={selected}
            deleteRows={deleteRows}
          />

          <TransactionTableBody
            tableData={tableData}
            tableMeta={tableMeta}
            constants={constants}
            handleSetSelected={handleSetSelected}
            handleStateChange={handleStateChange}
            options={options}
          />
        </Table>
      </TableContainer>

      <TransactionFooter
        addRow={addRow}
        transactionFooter={TRANSACTION_FOOTER}
        tableData={tableData}
        total={total}
        loading={loading}
        makeTransaction={makeTransaction}
      />

      <CustomSnackbar {...snackbarState} handleClose={closeSnackbar} />
    </div>
  );
};

export default Transaction;
