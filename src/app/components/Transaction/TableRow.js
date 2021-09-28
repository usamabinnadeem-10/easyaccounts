import React from "react";
import { useState } from "react";

import Select from "react-select";

import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

import { TYPE_SELECT, TYPE_INT, TYPE_FLOAT, TYPE_NONE } from "./constants";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const CustomRow = (props) => {
  const { row, index, handleChange, rowConstants } = props;
  console.log(row);

  const [selected, setSelected] = useState(null);

  //   const handleChange = (selectedOption) => {
  //     setSelected(selectedOption);
  //   };

  return (
    <TableRow
      key={row.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell scope="row" sx={{ py: 0 }}>
        <Checkbox onClick={() => console.log(index)} />
      </TableCell>

      {rowConstants.map((field, i) => {
        if (field.type === TYPE_SELECT) {
          return (
            <TableCell key={i} scope="row" sx={{ width: "200px", py: 0 }}>
              <Select
                placeholder="Select Product"
                value={row.product}
                //   onChange={handleChange}
                options={options}
              />
            </TableCell>
          );
        } else if (field.type === TYPE_NONE) {
          return (
            <TableCell key={i} align="right">
              <Typography>{row.total}</Typography>
            </TableCell>
          );
        } else {
          return (
            <TableCell align="right" key={i}>
              <TextField
                onChange={(e) =>
                  handleChange(
                    index,
                    field.name,
                    row.type === TYPE_INT
                      ? parseInt(e.target.value || 0)
                      : parseFloat(e.target.value || 0)
                  )
                }
                placeholder={row.type}
                sx={{
                  "& .MuiInputBase-sizeSmall": { height: "38px" },
                  "& .MuiInputBase-inputSizeSmall": { textAlign: "end" },
                }}
                variant="outlined"
                size="small"
              />
            </TableCell>
          );
        }
      })}
    </TableRow>
  );
};

export default CustomRow;
