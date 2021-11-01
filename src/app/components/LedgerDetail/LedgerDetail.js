import React from "react";

import CustomTable from "../CustomTable/CustomTable";

import { IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useStyles } from "./styles";

function LedgerDetail({
  rows,
  onRowClick,
  hoverProperty,
  handleEdit,
  handleDelete,
}) {
  const classes = useStyles();

  const COLUMNS = [
    {
      accessor: "date",
      Header: "Date",
      Cell: (row) => (
        <div onClick={() => onRowClick(row.row.id)}>{row.value}</div>
      ),
    },
    {
      accessor: "detail",
      Header: "Detail",
      Cell: (row) => (
        <div onClick={() => onRowClick(row.row.id)}>{row.value}</div>
      ),
    },
    {
      accessor: "debit",
      Header: "Debit",
      Cell: (row) => (
        <div onClick={() => onRowClick(row.row.id)}>{row.value}</div>
      ),
    },
    {
      accessor: "credit",
      Header: "Credit",
      Cell: (row) => (
        <div onClick={() => onRowClick(row.row.id)}>{row.value}</div>
      ),
    },
    {
      accessor: "balance",
      Header: "Balance",
      Cell: (row) => (
        <div
          className={`${row.value < 0 ? classes.debit : classes.credit}`}
          onClick={() => onRowClick(row.row.id)}
        >
          {row.value < 0
            ? `${row.value.toString().substring(1)} DB`
            : `${row.value} CR`}
        </div>
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
    <CustomTable
      columns={COLUMNS}
      data={rows}
      hoverProperty={hoverProperty}
      pre
    />
  );
}

export default LedgerDetail;
