import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import CustomToggleButtons from "../../components/CustomToggleButtons/CustomToggleButtons";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

import Select from "react-select";

import { Button } from "@mui/material";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";

import EmailIcon from "@mui/icons-material/Email";
import SaveIcon from "@mui/icons-material/Save";

import { Delete } from "@mui/icons-material";
import { Add } from "@mui/icons-material";

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
  const [errorMessage, setErrorMessage] = useState(
    constants.ERROR_DEFAULTS.ROW_INCOMPLETE
  );
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [loading, setLoading] = useState(false);

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

  const makeTransaction = (draft = false) => {
    if (!selectedOptions.currentPerson) {
      openSnackbar(
        true,
        "error",
        constants.ERROR_DEFAULTS.NO_PERSON + personIdentifier
      );
      return;
    }
    if (
      selectedOptions.currentTransactionType === "paid" &&
      !selectedOptions.currentAccountType
    ) {
      openSnackbar(true, "error", constants.ERROR_DEFAULTS.NO_ACCOUNT);
      return;
    }
    if (selectedOptions.currentTransactionType === "paid" && !paidAmount) {
      openSnackbar(true, "error", constants.ERROR_DEFAULTS.NO_PAID_AMOUNT);
      return;
    }
    if (tableData.length === 0) {
      openSnackbar(true, "error", constants.ERROR_DEFAULTS.NO_ROW);
      return;
    }
    if (!canAddRow()) {
      openSnackbar(true, "error", constants.ERROR_DEFAULTS.ROW_INCOMPLETE);
      return;
    } else {
      setLoading(true);
      let transaction = {
        nature: natures[selectedOptions.currentTransactionType],
        person: selectedOptions.currentPerson.value,
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
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" fontWeight="900" sx={{ mb: 2 }}>
        {`New ${personIdentifier} Transaction`}
      </Typography>

      <Grid container>
        <div className={`${classes.selectCustomer}`}>
          <Select
            placeholder={personIdentifier}
            value={selectedOptions.currentPerson}
            onChange={(user) => updateMetaData(metaConstants.user, user)}
            options={options.people}
          />
        </div>
        <CustomDatePicker
          getDate={(date) => updateMetaData(metaConstants.date, date)}
          value={selectedOptions.currentDate}
        />
        <div className={classes.metaItems}>
          <CustomToggleButtons
            buttons={transactionTypes}
            getSelectedValue={(type) =>
              updateMetaData(metaConstants.transactionType, type)
            }
            selectedValue={selectedOptions.currentTransactionType}
          />
        </div>
        {showAccountTypes && (
          <div>
            <Select
              placeholder={"Account Type"}
              value={selectedOptions.currentAccountType}
              onChange={(account) =>
                updateMetaData(metaConstants.accountType, account)
              }
              options={options.accountTypes}
            />
          </div>
        )}
      </Grid>

      <TableContainer component={Paper} sx={{ my: 3, overflow: "visible" }}>
        <Table>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              {tableMeta.map((head, index) => {
                return (
                  <TableCell
                    key={index}
                    sx={{ color: "white", py: 1, px: 1, fontWeight: 700 }}
                    align={index === 0 ? "center" : "left"}
                  >
                    {index === 0 && selected.length > 0 ? (
                      <IconButton
                        size="small"
                        onClick={() => deleteRows()}
                        sx={{
                          color: "#FAAB25",
                        }}
                      >
                        <Delete />
                      </IconButton>
                    ) : (
                      head.name
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData.map((row, rowIndex) => {
              return (
                <TableRow key={rowIndex}>
                  {tableMeta.map((column, columnIndex) => {
                    switch (column.field) {
                      case constants.FIELD_TYPES.CHECKBOX:
                        return (
                          <TableCell
                            key={columnIndex}
                            scope="row"
                            sx={{ py: 0, px: 1 }}
                          >
                            <Checkbox
                              checked={row.selected}
                              onClick={(e) =>
                                handleSetSelected(rowIndex, e.target.checked)
                              }
                            />
                          </TableCell>
                        );
                      case constants.FIELD_TYPES.SELECT:
                        return (
                          <TableCell
                            key={columnIndex}
                            sx={{ py: 0, width: "16%", px: 1 }}
                          >
                            <Select
                              components={{
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null,
                              }}
                              placeholder={column.name}
                              value={row[column.name.toLowerCase()]}
                              onChange={(value) =>
                                handleStateChange(
                                  value,
                                  rowIndex,
                                  column.name.toLowerCase()
                                )
                              }
                              options={
                                column.name.toLowerCase() !==
                                constants.DEFAULTS.COLOR
                                  ? options[column.name.toLowerCase()]
                                  : tableData[rowIndex].product
                                  ? options.color[
                                      tableData[rowIndex].product.value
                                    ]
                                  : []
                              }
                            />
                          </TableCell>
                        );
                      case constants.FIELD_TYPES.NUMBER:
                        return (
                          <TableCell
                            sx={{ py: 1, px: 1 }}
                            key={columnIndex}
                            align="right"
                          >
                            <TextField
                              placeholder={column.name}
                              onChange={(e) =>
                                handleStateChange(
                                  parseFloat(e.target.value || 0),
                                  rowIndex,
                                  column.name.toLowerCase()
                                )
                              }
                              type="number"
                              variant="outlined"
                              size="small"
                              value={row[column.name.toLowerCase()] || ""}
                              inputProps={{
                                min: 0,
                              }}
                              disabled={column.readOnly}
                            />
                          </TableCell>
                        );
                      default:
                        return null;
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="flex-end" sx={{ pb: 2 }}>
        <Fab onClick={() => addRow()} color="secondary" size="small">
          <Add />
        </Fab>
      </Grid>

      <Grid container justifyContent="flex-end" sx={{ pb: 2 }}>
        <Grid sx={{ width: "max-content" }} container direction="column">
          {TRANSACTION_FOOTER.map((field, index) => {
            if (field.visible) {
              return (
                <TextField
                  key={index}
                  inputProps={{
                    min: 0,
                  }}
                  type="number"
                  variant="outlined"
                  size="small"
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) =>
                    field.action(parseFloat(e.target.value) || "")
                  }
                  sx={{
                    width: 200,
                    py: 1,
                  }}
                />
              );
            }
            return null;
          })}
        </Grid>
      </Grid>

      <Grid container justifyContent="space-between">
        <Typography variant="button" fontWeight="900">
          Items : {tableData.length - 1}
        </Typography>
        <Typography variant="button" fontWeight="900">
          PKR : {total || 0} /=
        </Typography>
      </Grid>
      {loading ? (
        <CustomLoader loading={loading} height={20} />
      ) : (
        <Grid sx={{ my: 2 }}>
          <Button
            endIcon={<EmailIcon />}
            variant="contained"
            sx={{ fontWeight: 900, mr: 2 }}
            onClick={() => makeTransaction()}
          >
            Finalize
          </Button>

          <Button
            endIcon={<SaveIcon />}
            variant="contained"
            sx={{ fontWeight: 900 }}
            color="warning"
            onClick={() => makeTransaction(true)}
          >
            Save as draft
          </Button>
        </Grid>
      )}

      <CustomSnackbar {...snackbarState} handleClose={closeSnackbar} />
    </div>
  );
};

export default Transaction;
