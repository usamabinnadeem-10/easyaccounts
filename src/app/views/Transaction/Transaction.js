import React from "react";
import { useState } from "react";

import Select from "react-select";

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

import CustomSnackbar from "../../containers/CustomSnackbar/CustomSnackbar";
import CustomToggleButtons from "../../components/CustomToggleButtons/CustomToggleButtons";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";

import { Delete } from "@mui/icons-material";
import { Add } from "@mui/icons-material";

import * as constants from "./constants";

import { useStyles } from "./styles";

const Transaction = (props) => {
  const {
    tableMeta,
    updateMetaData,
    defaultRow,
    transactionTypes,
    people,
    metaConstants,
    transactionType,
    date,
    currentPerson,
    personIdentifier,
    products,
    colors,
  } = props;

  let classes = useStyles();

  const [selected, setSelected] = useState([]);
  const [colorOptions, setColorOptions] = useState(colors);
  const [productOptions, setProductOptions] = useState(products);
  const [tableData, setTableData] = useState([defaultRow]);
  const [snackbarState, setSnackbarState] = useState({});
  const [errorMessage, setErrorMessage] = useState(
    constants.ERROR_DEFAULTS.ROW_INCOMPLETE
  );

  // add a new row to the transaction table
  const addRow = () => {
    if (canAddRow()) {
      let newTableData = [...tableData];
      let lastRow = tableData[tableData.length - 1];
      let newRow = {
        ...constants.DEFAULT_ROW,
        product: lastRow ? lastRow.product : null,
        quantity: lastRow ? lastRow.quantity : 0,
        rate: lastRow ? lastRow.rate : 0,
        total: lastRow ? lastRow.quantity * lastRow.rate : 0,
      };
      newTableData.push(newRow);
      tableData.length && removeLastEnteredColor();
      setTableData(newTableData);
      setErrorMessage("");
    } else {
      openSnackbar(true, "error", errorMessage);
    }
  };

  // remove the last entered product to ensure it doesn't appear again in next row
  const removeLastEnteredColor = () => {
    let lastIndex = tableData.length - 1;
    let lastColor = tableData[lastIndex].color.value;
    let lastProduct = tableData[lastIndex].product.value;
    let newColors = colorOptions[lastProduct].filter(
      (color) => color.value !== lastColor
    );
    setColorOptions({
      ...colorOptions,
      [lastProduct]: newColors,
    });
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
      open: false,
      severity: "",
      message: "",
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
    if (productOptions.length === 1) {
      setErrorMessage(constants.ERROR_DEFAULTS.NO_MORE_PRODUCTS);
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
    let newColorsData = { ...colorOptions };

    while (elementsToDelete.length) {
      let indexToPop = elementsToDelete.pop();
      let row = newTableData[indexToPop];
      let product = row.product;
      let color = row.color;
      color && newColorsData[product.value].push(color);
      newTableData.splice(indexToPop, 1);
    }

    setColorOptions(newColorsData);
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
        column === "product"
          ? null
          : column === "color"
          ? val
          : newState[index]["color"],
    };
    let row = newState[index];
    row[constants.DEFAULTS.TOTAL] =
      row[constants.DEFAULTS.RATE] * row[constants.DEFAULTS.QUANTITY];
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

  return (
    <div className={classes.root}>
      <Typography variant="h5" fontWeight="900" sx={{ mb: 2 }}>
        {`New ${personIdentifier} Transaction`}
      </Typography>

      <Grid container>
        <div className={`${classes.selectCustomer} ${classes.metaItems}`}>
          <Select
            placeholder={personIdentifier}
            value={currentPerson}
            onChange={(customer) =>
              updateMetaData(metaConstants.customer, customer)
            }
            options={people}
          />
        </div>
        <CustomDatePicker
          getDate={(date) => updateMetaData(metaConstants.date, date)}
          value={date}
        />
        <div className={classes.metaItems}>
          <CustomToggleButtons
            buttons={transactionTypes}
            getSelectedValue={(type) =>
              updateMetaData(metaConstants.transactionType, type)
            }
            selectedValue={transactionType}
          />
        </div>
      </Grid>

      <Grid container wrap="nowrap" alignItems="flex-end">
        <TableContainer component={Paper} sx={{ my: 3, overflow: "visible" }}>
          <Table>
            <TableHead sx={{ bgcolor: "primary.main" }}>
              <TableRow>
                {tableMeta.map((head, index) => {
                  return (
                    <TableCell key={index} sx={{ color: "white" }} align="left">
                      {index === 0 && selected.length > 0 ? (
                        <IconButton onClick={() => deleteRows()} color="error">
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
                        case "checkbox":
                          return (
                            <TableCell
                              key={columnIndex}
                              scope="row"
                              sx={{ py: 0 }}
                            >
                              <Checkbox
                                checked={row.selected}
                                onClick={(e) =>
                                  handleSetSelected(rowIndex, e.target.checked)
                                }
                              />
                            </TableCell>
                          );
                        case "select":
                          return (
                            <TableCell
                              key={columnIndex}
                              sx={{ py: 0, width: "20%" }}
                            >
                              <Select
                                isDisabled={tableData.length - 1 > rowIndex}
                                placeholder={column.name}
                                value={
                                  column.name.toLowerCase() === "product"
                                    ? row.product
                                    : row.color
                                }
                                onChange={(value) =>
                                  handleStateChange(
                                    value,
                                    rowIndex,
                                    column.name.toLowerCase()
                                  )
                                }
                                options={
                                  column.name.toLowerCase() === "product"
                                    ? column.options
                                    : tableData[rowIndex].product
                                    ? colorOptions[
                                        tableData[rowIndex].product.value
                                      ]
                                    : null
                                }
                              />
                            </TableCell>
                          );
                        case "number":
                          return (
                            <TableCell key={columnIndex} align="right">
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
        <div className={classes.addIcon}>
          <Fab onClick={() => addRow()} color="secondary" size="small">
            <Add />
          </Fab>
        </div>
      </Grid>
      <CustomSnackbar {...snackbarState} handleClose={closeSnackbar} />
    </div>
  );
};

export default Transaction;
