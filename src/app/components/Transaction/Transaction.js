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

import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import CustomToggleButtons from "../CustomToggleButtons/CustomToggleButtons";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";

import { Delete } from "@mui/icons-material";
import { Add } from "@mui/icons-material";

import { TABLE_HEAD, TEXT_ROWS, DEFAULT_ROW, DEFAULTS } from "./constants";

import { capitalizeFirstLetter } from "../../utilities/stringUtils";

import { useStyles } from "./styles";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const PRODUCTS = [
  { value: "AK_1", label: "AK-1" },
  { value: "AK_2", label: "AK-2" },
  { value: "AK_3", label: "AK-3" },
];

const TRANSACTION_TYPES = [
  {
    name: "Cash",
    value: "cash",
    color: "success",
  },
  {
    name: "Credit",
    value: "credit",
    color: "error",
  },
];

const Transaction = (props) => {
  let classes = useStyles();

  const [selected, setSelected] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [date, setDate] = useState("");
  const [transactionType, setTransactionType] = useState("credit");
  const [productOptions, setProductOptions] = useState(PRODUCTS);
  const [tableData, setTableData] = useState([DEFAULT_ROW]);
  const [snackbarState, setSnackbarState] = useState({});
  const [errorMessage, setErrorMessage] = useState(
    "Please complete adding the current product"
  );

  const addRow = () => {
    if (canAddRow()) {
      let newTableData = [...tableData];
      let lastRow = tableData[tableData.length - 1];
      let newRow = {
        ...DEFAULT_ROW,
        quantity: lastRow.quantity,
        rate: lastRow.rate,
        total: lastRow.quantity * lastRow.rate,
      };
      newTableData.push(newRow);
      setTableData(newTableData);
      removeLastEnteredProduct();
      setErrorMessage("");
    } else {
      openSnackbar(true, "error", errorMessage);
    }
  };

  const removeLastEnteredProduct = () => {
    let lastProduct = tableData[tableData.length - 1].product.value;
    let newProducts = productOptions.filter(
      (product) => product.value !== lastProduct
    );
    setProductOptions(newProducts);
  };

  const openSnackbar = (open, severity, message) => {
    setSnackbarState({
      open,
      severity,
      message,
    });
  };

  const closeSnackbar = () => {
    setSnackbarState({
      open: false,
      severity: "",
      message: "",
    });
  };

  const canAddRow = () => {
    let copyTableData = JSON.parse(JSON.stringify(tableData));
    let lastRow = copyTableData[copyTableData.length - 1];
    if (tableData.length === 0) {
      return true;
    }
    if (lastRow["total"] <= 0) {
      setErrorMessage("Total is very low");
      return false;
    }
    if (productOptions.length === 1) {
      setErrorMessage("You do not have any more products to add");
      return false;
    }
    delete lastRow.selected;
    delete lastRow.total;
    for (const key in lastRow) {
      if (!lastRow[key]) {
        setErrorMessage("Please complete adding the current product");
        return false;
      }
    }
    return true;
  };

  const deleteRows = () => {
    let elementsToDelete = selected.sort();
    let newTableData = [...tableData];
    let productsToAdd = [];
    while (elementsToDelete.length) {
      let indexToPop = elementsToDelete.pop();
      productsToAdd.push(newTableData[indexToPop].product);
      newTableData.splice(indexToPop, 1);
    }
    setProductOptions([...productOptions, ...productsToAdd]);
    setTableData(newTableData);
    setSelected([]);
  };

  const handleSetCustomer = (customer) => {
    setCustomer(customer);
  };

  const handleStateChange = (val, index, column) => {
    let newState = [...tableData];
    newState[index] = {
      ...newState[index],
      [column]: val,
    };
    let row = newState[index];
    row["total"] = row["rate"] * row["quantity"];
    setTableData(newState);
  };

  const handleSetSelected = (row, checked) => {
    let newSelected = [...selected];
    if (!checked) {
      newSelected = newSelected.filter((current) => current !== row);
    } else {
      newSelected.push(row);
    }
    handleStateChange(checked, row, DEFAULTS.SELECTED);
    setSelected(newSelected);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" fontWeight="900" sx={{ mb: 2 }}>
        New Transaction
      </Typography>
      <Grid justifyContent="space-between" container>
        <div className={classes.selectCustomer}>
          <Select
            placeholder="Select Customer"
            value={customer}
            onChange={handleSetCustomer}
            options={options}
          />
        </div>
        <CustomDatePicker getDate={(value) => setDate(value)} value={date} />
        <CustomToggleButtons
          buttons={TRANSACTION_TYPES}
          getSelectedValue={(value) => setTransactionType(value)}
          selectedValue={transactionType}
        />
      </Grid>

      <TableContainer component={Paper} sx={{ my: 3, overflow: "visible" }}>
        <Table>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              {TABLE_HEAD.map((head, index) => {
                return (
                  <TableCell key={index} sx={{ color: "white" }} align="left">
                    {index === 0 && selected.length > 0 ? (
                      <IconButton onClick={() => deleteRows()} color="error">
                        <Delete />
                      </IconButton>
                    ) : (
                      head.headerName
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell scope="row" sx={{ py: 0 }}>
                    <Checkbox
                      checked={row.selected}
                      onClick={(e) =>
                        handleSetSelected(index, e.target.checked)
                      }
                    />
                  </TableCell>

                  <TableCell sx={{ py: 0, width: "12rem" }}>
                    <Select
                      placeholder="Product"
                      value={row.product}
                      onChange={(value) =>
                        handleStateChange(value, index, "product")
                      }
                      options={productOptions}
                    />
                  </TableCell>
                  {TEXT_ROWS.map((field, idx) => {
                    return (
                      <TableCell key={idx} align="right">
                        <TextField
                          placeholder={capitalizeFirstLetter(field.name)}
                          onChange={(e) =>
                            handleStateChange(
                              parseFloat(e.target.value || 0),
                              index,
                              field.name
                            )
                          }
                          type="number"
                          variant="outlined"
                          size="small"
                          value={row[field.name] || ""}
                          inputProps={{
                            min: 0,
                          }}
                        />
                      </TableCell>
                    );
                  })}
                  <TableCell sx={{ py: 0 }}>
                    <TextField
                      value={row.total}
                      size="small"
                      variant="outlined"
                      disabled
                      className={`${classes.total} ${
                        row.total < 0 && classes.error
                      }`}
                    ></TextField>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="flex-end">
        <Fab onClick={() => addRow()} color="secondary" size="small">
          <Add />
        </Fab>
      </Grid>
      <CustomSnackbar {...snackbarState} handleClose={closeSnackbar} />
    </div>
  );
};

export default Transaction;
