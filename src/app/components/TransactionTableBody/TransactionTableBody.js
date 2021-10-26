import React from "react";

import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";

import Select from "react-select";

function TransactionTableBody(props) {
  const {
    tableData,
    tableMeta,
    constants,
    handleSetSelected,
    handleStateChange,
    options,
  } = props;
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
                          column.name.toLowerCase() !== constants.DEFAULTS.COLOR
                            ? options[column.name.toLowerCase()]
                            : tableData[rowIndex].product
                            ? options.color[tableData[rowIndex].product.value]
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
  );
}

export default TransactionTableBody;
