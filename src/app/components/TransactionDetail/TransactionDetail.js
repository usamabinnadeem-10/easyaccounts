import React from "react";

import CustomTable from "../CustomTable/CustomTable";

import { IconButton } from "@mui/material";
import { Chip } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function TransactionDetail(props) {
  const { rows, onRowClick, hoverProperty, handleEdit, handleDelete } = props;

  const CHIP_COLORS = {
    paid: "success",
    credit: "error",
    maal_wapsi: "secondary",
    purchase: "info",
  };

  const COLUMNS = [
    {
      accessor: "serial",
      Header: "ID",
      Cell: (row) => (
        <div onClick={() => onRowClick(row.row.id)}>{row.value}</div>
      ),
    },
    {
      accessor: "date",
      Header: "Date",
      Cell: (row) => (
        <div onClick={() => onRowClick(row.row.id)}>{row.value}</div>
      ),
    },
    {
      accessor: "total",
      Header: "Amount",
      Cell: (row) => (
        <div onClick={() => onRowClick(row.row.id)}>{row.value}</div>
      ),
    },
    {
      accessor: "discount",
      Header: "Discount",
      Cell: (row) => (
        <div onClick={() => onRowClick(row.row.id)}>{row.value}</div>
      ),
    },
    {
      accessor: "type",
      Header: "Type",
      Cell: (row) => (
        <Chip
          size="small"
          color={CHIP_COLORS[row.value]}
          label={row.value.replace("_", " ")}
          sx={{
            fontWeight: 900,
            borderRadius: 1.5,
            textTransform: "capitalize",
          }}
        />
      ),
    },
    {
      accessor: "edit",
      Header: "Edit",
      Cell: (row) => (
        <IconButton onClick={() => handleEdit(row.row.id)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      accessor: "delete",
      Header: "Delete",
      Cell: (row) => (
        <IconButton onClick={() => handleDelete(row.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <CustomTable columns={COLUMNS} data={rows} hoverProperty={hoverProperty} />
  );
}

export default TransactionDetail;
