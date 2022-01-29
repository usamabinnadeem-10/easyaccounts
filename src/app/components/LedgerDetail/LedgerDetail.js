import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import CustomTable from "../CustomTable/CustomTable";

import { IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useStyles } from "./styles";

import {convertCurrencyToNumber} from "../../utilities/stringUtils";

function LedgerDetail({
  rows,
  onRowClick,
  hoverProperty,
  handleEdit,
  handleDelete,
  daybookView,
  hideDetails,
}) {
  const COLUMNS = [
    {
      accessor: "date",
      Header: "Date",
      Cell: (row) => (
        <div onClick={() => onRowClick(row.row.id)}>{row.value}</div>
      ),
    },
    {
      accessor: "transaction_serial",
      Header: "Invoice #",
      Cell: (row) => (
        <div onClick={() => onRowClick(row.row.id)}>{row.value || "--"}</div>
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
          className={`${convertCurrencyToNumber(row.value) < 0 ? classes.debit : classes.credit}`}
          onClick={() => onRowClick(row.row.id)}
        >
          {convertCurrencyToNumber(row.value) < 0
            ? `${row.value.toString().substring(1)} DB`
            : `${row.value} CR`}
        </div>
      ),
    },
    {
      accessor: "edit",
      Header: "Edit",
      hideInPrint: true,
      Cell: (row) => (
        <IconButton onClick={() => handleEdit(row.row.id)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      accessor: "delete",
      Header: "Delete",
      hideInPrint: true,
      Cell: (row) => (
        <IconButton onClick={() => handleDelete(row.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  if (daybookView) {
    COLUMNS[5] = {
      accessor: "person_name",
      Header: "Person",
      Cell: (row) => (
        <div onClick={() => onRowClick(row.row.id)}>{row.value}</div>
      ),
    };
  }

  const classes = useStyles();
  const [columns, setColumns] = useState(COLUMNS);

  useEffect(() => {
    if (hideDetails) {
      setColumns(COLUMNS.filter((column) => column.accessor !== "detail"));
    } else {
      setColumns(COLUMNS);
    }
  }, [hideDetails]);

  return (
    <CustomTable
      columns={columns}
      data={rows}
      hoverProperty={hoverProperty}
      pre
    />
  );
}

export default LedgerDetail;
