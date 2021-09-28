import React from "react";
import { useState } from "react";

import Select from "react-select";

import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
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

import { Delete } from "@mui/icons-material";
import { Add } from "@mui/icons-material";

import { TABLE_HEAD, TEXT_ROWS, DEFAULT_ROW, DEFAULTS } from "./constants";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Transaction = (props) => {
  const { open, handleClose } = props;

  const [selected, setSelected] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [tableData, setTableData] = useState([DEFAULT_ROW]);

  const addRow = () => {
    let newTableData = [...tableData];
    newTableData.push(DEFAULT_ROW);
    setTableData(newTableData);
  };

  const deleteRows = () => {
    let elementsToDelete = selected.sort();
    let newTableData = [...tableData];
    while (elementsToDelete.length) {
      newTableData.splice(elementsToDelete.pop(), 1);
    }
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
    newState[index]["total"] =
      newState[index]["rate"] * newState[index]["quantity"] -
      newState[index]["discount"];
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
    <Drawer
      open={open}
      anchor="right"
      onClose={handleClose}
      sx={{
        zIndex: 1400,
        "& .MuiDrawer-paperAnchorRight": {
          width: 900,
          py: 3,
          px: 2,
        },
      }}
    >
      <Grid container direction="column">
        <Typography variant="h5" fontWeight="900" sx={{ mb: 2 }}>
          New Transaction
        </Typography>

        <Select
          placeholder="Select Customer"
          value={customer}
          onChange={handleSetCustomer}
          options={options}
        />

        <TableContainer component={Paper} sx={{ my: 3, overflow: "visible" }}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
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
                        defaultChecked={false}
                        checked={row.selected}
                        onClick={(e) =>
                          handleSetSelected(index, e.target.checked)
                        }
                      />
                    </TableCell>

                    <TableCell align="right" sx={{ width: "150px", py: 0 }}>
                      <Select
                        placeholder="Product"
                        value={row.product}
                        onChange={(value) =>
                          handleStateChange(value, index, "product")
                        }
                        options={options}
                      />
                    </TableCell>
                    {TEXT_ROWS.map((field, idx) => {
                      return (
                        <TableCell key={idx} align="right">
                          <TextField
                            placeholder={field.name}
                            onChange={(e) =>
                              handleStateChange(
                                e.target.value,
                                index,
                                field.name
                              )
                            }
                            sx={{
                              "& .MuiInputBase-sizeSmall": { height: "38px" },
                            }}
                            type="number"
                            variant="outlined"
                            size="small"
                            value={row[field.name] || ""}
                          />
                        </TableCell>
                      );
                    })}
                    <TableCell sx={{ width: "200px", py: 0 }}>
                      <Typography>{row.total}</Typography>
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
      </Grid>
    </Drawer>
  );
};

export default Transaction;
