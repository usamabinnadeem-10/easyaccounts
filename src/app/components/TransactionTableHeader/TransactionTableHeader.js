import React from "react";

import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Delete } from "@mui/icons-material";

function TransactionTableHeader(props) {
  const { tableMeta, selected, deleteRows } = props;
  return (
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
  );
}

export default TransactionTableHeader;
