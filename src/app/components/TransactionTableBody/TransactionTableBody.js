import React from "react";

import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";

import CreatableSelect from "react-select/creatable";

import { customStyles } from "./styles";

function TransactionTableBody(props) {
  const {
    tableData,
    tableMeta,
    constants,
    handleSetSelected,
    handleStateChange,
    options,
    customColumnOptions,
  } = props;

  const getOptions = (tableRow, columnName) => {
    let lowerName = columnName.toLowerCase();
    // if there is an override array then find the options for that column inside table data,
    // otherwise find in options object
    if (customColumnOptions.length) {
      let customOption = customColumnOptions.find(
        (option) => option.columnNameToOverride === columnName
      );
      // if key exists in tableRow then return that otherwise an empty array
      if (customOption) {
        return tableRow[customOption.optionsNameInTable] || [];
      } else {
        return options[lowerName];
      }
    } else {
      return options[lowerName];
    }
  };

  return (
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
                    <TableCell key={columnIndex} sx={{ py: 0, px: 1 }}>
                      <CreatableSelect
                        styles={customStyles(column.name)}
                        isClearable
                        escapeClearsValue
                        tabSelectsValue
                        openMenuOnFocus
                        components={{
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }}
                        placeholder={column.name}
                        value={row[column.name.toLowerCase()]}
                        onChange={(value) => {
                          handleStateChange(
                            value,
                            rowIndex,
                            column.name.toLowerCase()
                          );
                        }}
                        options={getOptions(row, column.name)}
                        isValidNewOption={(inputValue) =>
                          !isNaN(+inputValue) && inputValue
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
                        label={
                          column.name === "Quantity" &&
                          `Qty: ${row.stock_quantity || 0} thaan`
                        }
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
  );
}

export default TransactionTableBody;
