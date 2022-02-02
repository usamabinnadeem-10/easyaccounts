import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router";

import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import TransactionFooter from "../../components/TransactionFooter/TransactionFooter";
import TransactionHeader from "../../components/TransactionHeader/TransactionHeader";
import TransactionTableBody from "../../components/TransactionTableBody/TransactionTableBody";
import TransactionTableHeader from "../../components/TransactionTableHeader/TransactionTableHeader";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import * as constants from "./constants";
import {
  getAllStock,
  setShouldFetch,
} from "../../../store/transactions/actions";
import { setShouldFetchDaybook } from "../../../store/accounts/actions";
import {
  TRANSACTION_URLS,
  LEDGER_URLS,
} from "../../../constants/restEndPoints";
import { VIEW_SINGLE_TRANSACTION } from "../../../constants/routesConstants";

import instance from "../../../utils/axiosApi";

import {
  getGazaanaOptions,
  getWarehouseOptions,
  formatTransaction,
  getStockQuantity,
} from "./utils";

import { useStyles } from "./styles";
import { getURL, makeQueryParamURL } from "../../utilities/stringUtils";
import { findErrorMessage } from "../../utilities/objectUtils";

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
    transactionDetails,
    transaction,
  } = props;

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const transactionStore = useSelector((state) => state.transactions);

  const [selected, setSelected] = useState([]);
  const [tableData, setTableData] = useState([defaultRow]);
  const [snackbarState, setSnackbarState] = useState({});
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [detail, setDetail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    constants.ERROR_DEFAULTS.ROW_INCOMPLETE
  );
  const [shouldValidate, setShouldValidate] = useState(true);
  const [currentPersonBalance, setCurrentPersonBalance] = useState(null);

  const TRANSACTION_FOOTER = [
    {
      placeholder: "Discount",
      action: setDiscount,
      value: discount,
      visible: true,
      type: "number",
    },
    {
      placeholder: "Paid Amount",
      action: setPaidAmount,
      value: paidAmount,
      visible: showAccountTypes,
      type: "number",
    },
    {
      placeholder: "Detail",
      action: setDetail,
      value: detail,
      visible: true,
      type: "text",
    },
  ];

  // check if the quantity needs to be validated when adding or finalizing transaction
  useEffect(() => {
    // if editing transaction, set validate to false
    if (transaction && transactionDetails?.length) {
      setShouldValidate(false);
    } else {
      setShouldValidate(
        transactionTypes.find(
          (element) => element.value === selectedOptions.currentTransactionType
        ).validate
      );
    }
  }, [selectedOptions.currentTransactionType, transactionDetails, transaction]);

  // fetch balance for current person
  useEffect(() => {
    let personId = selectedOptions?.currentPerson?.value;
    if (personId) {
      let URL = makeQueryParamURL(LEDGER_URLS.ALL_BALANCES, [
        { key: "person_id", value: personId },
      ]);
      instance
        .get(URL)
        .then((response) => {
          setCurrentPersonBalance(
            response.data[selectedOptions.currentPerson.label]
          );
        })
        .catch((error) => {
          setCurrentPersonBalance(null);
        });
    } else {
      setCurrentPersonBalance(null);
    }
  }, [selectedOptions.currentPerson]);

  // fetch all stock from backend
  useEffect(() => {
    if (transactionStore.shouldFetchStock) {
      dispatch(getAllStock());
    }
  }, []);

  // set grand total of transaction
  useEffect(() => {
    let total = 0.0;
    tableData.forEach((row) => {
      total += row.total;
    });
    setTotal(total - discount);
  }, [tableData, discount]);

  // fill transaction for editing
  useEffect(() => {
    transactionDetails?.length &&
      transaction &&
      Object.entries(transactionStore.allStock).length &&
      setTableData(
        formatTransaction(transactionStore.allStock, transactionDetails)
      );
    transaction && setPaidAmount(transaction.amount_paid);
  }, [transactionDetails, transactionStore.allStock]);

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
        gazaana: lastRow?.gazaana ?? null,
        rate: lastRow?.rate ?? 0,
        total: lastRow?.total ?? 0,
        total_gazaana: lastRow?.total_gazaana ?? 0,
      };
      if (transaction) {
        newRow.new = true;
      }
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

  // test if quantity of line items is valid
  const isQuantityOkay = () => {
    let copyTableData = JSON.parse(JSON.stringify(tableData));
    var stock = JSON.parse(JSON.stringify(transactionStore.allStock));

    for (let i = 0; i < copyTableData.length; i++) {
      let currentQuantity = copyTableData[i][constants.DEFAULTS.QUANTITY];
      let currentProduct = copyTableData[i][constants.DEFAULTS.PRODUCT];
      let currentWarehouse = copyTableData[i][constants.DEFAULTS.WAREHOUSE];
      let currentGazaana = copyTableData[i][constants.DEFAULTS.GAZAANA].value;
      let actualQuantityIndex = stock.findIndex((value) => {
        return (
          value.product === currentProduct.value &&
          value.warehouse === currentWarehouse.value &&
          value.yards_per_piece === currentGazaana
        );
      });
      let actualQuantity = stock[actualQuantityIndex]?.stock_quantity;
      if (!actualQuantity) {
        return {
          okay: false,
          error: `(check line ${i + 1}) ${
            currentWarehouse.label
          } has ${0} thaan of ${currentProduct.label} ${currentGazaana} gaz`,
        };
      }
      if (currentQuantity > actualQuantity) {
        return {
          okay: false,
          error: `(check line ${i + 1}) ${
            currentWarehouse.label
          } has ${actualQuantity} thaan ${currentGazaana} gaz of ${
            currentProduct.label
          }`,
        };
      }
      stock[actualQuantityIndex].stock_quantity -= currentQuantity;
    }
    return { okay: true };
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
    delete lastRow.stock_quantity;
    for (const key in lastRow) {
      if (!lastRow[key]) {
        setErrorMessage(constants.ERROR_DEFAULTS.ROW_INCOMPLETE);
        return false;
      }
    }

    if (shouldValidate) {
      let okay = isQuantityOkay();
      if (!okay.okay) {
        setErrorMessage(okay.error);
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
    };
    let row = newState[index];
    row[constants.DEFAULTS.TOTAL] =
      row[constants.DEFAULTS.RATE] *
        row[constants.DEFAULTS.QUANTITY] *
        row[constants.DEFAULTS.GAZAANA]?.value || 0;

    row[constants.DEFAULTS.TOTAL_GAZAANA] =
      row[constants.DEFAULTS.QUANTITY] *
        row[constants.DEFAULTS.GAZAANA]?.value || 0;

    if (row[constants.DEFAULTS.PRODUCT]) {
      row["gazaanaOptions"] = getGazaanaOptions(
        transactionStore.allStock,
        row[constants.DEFAULTS.PRODUCT].value
      );
    } else {
      row["gazaanaOptions"] = [];
      row["gazaana"] = null;
      row["warehouseOptions"] = [];
      row["warehouse"] = null;
    }

    if (row[constants.DEFAULTS.PRODUCT] && row[constants.DEFAULTS.GAZAANA]) {
      row["warehouseOptions"] = getWarehouseOptions(
        transactionStore.allStock,
        row[constants.DEFAULTS.PRODUCT].value,
        row[constants.DEFAULTS.GAZAANA].value,
        props.warehouses
      );
    } else {
      row["warehouseOptions"] = [];
      row["warehouse"] = null;
    }

    if (
      row[constants.DEFAULTS.PRODUCT] &&
      row[constants.DEFAULTS.WAREHOUSE] &&
      row[constants.DEFAULTS.GAZAANA]
    ) {
      row["stock_quantity"] = getStockQuantity(
        transactionStore.allStock,
        row[constants.DEFAULTS.PRODUCT].value,
        row[constants.DEFAULTS.WAREHOUSE].value,
        row[constants.DEFAULTS.GAZAANA]?.value
      );
    } else {
      row["stock_quantity"] = null;
    }

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
      isError: !selectedOptions.currentManualInvoiceSerial,
      description: constants.ERROR_DEFAULTS.NO_MANUAL_INVOICE,
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
    {
      isError: total < 0,
      description: constants.ERROR_DEFAULTS.LOW_TOTAL,
    },
    {
      isError: paidAmount > total,
      description: constants.ERROR_DEFAULTS.PAID_AMOUNT_ERROR,
    },
    {
      isError: total < 0,
      description: constants.ERROR_DEFAULTS.LOW_TOTAL,
    },
  ];

  const redirect = (transaction) => {
    history.push({
      pathname: getURL(VIEW_SINGLE_TRANSACTION, "uuid", transaction.id),
      state: transaction,
    });
  };

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

    if (shouldValidate) {
      let okay = isQuantityOkay();
      if (!okay.okay) {
        openSnackbar(true, "error", okay.error);
        return;
      }
    }

    setLoading(true);
    let transactionData = {
      nature: natures[selectedOptions.currentTransactionType],
      person: selectedOptions.currentPerson.value,
      draft: draft,
      discount: discount || 0,
      type: selectedOptions.currentTransactionType,
      detail: detail || null,
      manual_invoice_serial: selectedOptions.currentManualInvoiceSerial,
      transaction_detail: tableData.map((data, index) => {
        return {
          id: data.id,
          new: data.new,
          product: data.product.value,
          yards_per_piece: parseFloat(data.gazaana.value),
          quantity: data.quantity,
          rate: data.rate,
          warehouse: data.warehouse.value,
          amount: data.total,
        };
      }),
    };
    if (selectedOptions.currentTransactionType === "paid") {
      transactionData["paid"] = true;
      transactionData["paid_amount"] = paidAmount;
      transactionData["account_type"] =
        selectedOptions.currentAccountType?.value;
    }
    if (selectedOptions.currentDate) {
      transactionData[
        "date"
      ] = `${selectedOptions.currentDate.year}-${selectedOptions.currentDate.month}-${selectedOptions.currentDate.day}`;
    }
    if (transaction) {
      instance
        .put(
          getURL(TRANSACTION_URLS.GET_TRANSACTION, "uuid", transaction.id),
          transactionData
        )
        .then((res) => {
          dispatch(setShouldFetch(true));
          dispatch(setShouldFetchDaybook(true));
          setLoading(false);
          redirect(res.data);
        })
        .catch((error) => {
          setLoading(false);
          openSnackbar(
            true,
            "error",
            error?.response?.data?.detail || constants.ERROR_DEFAULTS.OOPS
          );
        });
    } else {
      instance
        .post(TRANSACTION_URLS.CREATE_TRANSACTION, transactionData)
        .then((res) => {
          dispatch(setShouldFetch(true));
          dispatch(setShouldFetchDaybook(true));
          setLoading(false);
          redirect(res.data);
        })
        .catch((error) => {
          setLoading(false);
          openSnackbar(
            true,
            "error",
            findErrorMessage(error?.response?.data) ||
              constants.ERROR_DEFAULTS.OOPS
          );
        });
    }
  };

  return (
    <>
      {transactionStore.fetched && (
        <div className={classes.root}>
          <TransactionHeader
            currentBalance={currentPersonBalance}
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
                customColumnOptions={[
                  {
                    columnNameToOverride: "Gazaana",
                    optionsNameInTable: "gazaanaOptions",
                  },
                  {
                    columnNameToOverride: "Warehouse",
                    optionsNameInTable: "warehouseOptions",
                  },
                ]}
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
            transaction={transaction}
          />

          <CustomSnackbar {...snackbarState} handleClose={closeSnackbar} />
        </div>
      )}
    </>
  );
};

export default Transaction;
