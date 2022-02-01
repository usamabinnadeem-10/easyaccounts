import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import CustomTable from "../CustomTable/CustomTable";

import { IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useStyles } from "./styles";

import { convertCurrencyToNumber } from "../../utilities/stringUtils";

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
        <div onClick={row.row.id ? () => onRowClick(row.row.id) : null}>
          {row.value}
        </div>
      ),
    },
    {
      accessor: "transaction_serial",
      Header: "Invoice #",
      Cell: (row) => (
        <div onClick={row.row.id ? () => onRowClick(row.row.id) : null}>
          {row.value || "--"}
        </div>
      ),
    },
    {
      accessor: "manual_invoice_serial",
      Header: "Book #",
      Cell: (row) => (
        <div onClick={row.row.id ? () => onRowClick(row.row.id) : null}>
          {row.value || "--"}
        </div>
      ),
    },
    {
      accessor: "detail",
      Header: "Detail",
      Cell: (row) => (
        <div onClick={row.row.id ? () => onRowClick(row.row.id) : null}>
          {row.value}
        </div>
      ),
    },
    {
      accessor: "debit",
      Header: "Debit (نام)",
      color: "#C91D22",
      Cell: (row) => (
        <div
          className={classes.debit}
          onClick={row.row.id ? () => onRowClick(row.row.id) : null}
        >
          {row.value}
        </div>
      ),
    },
    {
      accessor: "credit",
      Header: "Credit (جمع)",
      color: "#00A465",
      Cell: (row) => (
        <div
          className={classes.credit}
          onClick={row.row.id ? () => onRowClick(row.row.id) : null}
        >
          {row.value}
        </div>
      ),
    },
    {
      accessor: "balance",
      Header: "Balance",
      Cell: (row) => {
        if (row.row.id) {
          return (
            <div
              className={`${
                convertCurrencyToNumber(row.value) < 0
                  ? classes.debit
                  : classes.credit
              }`}
              onClick={row.row.id ? () => onRowClick(row.row.id) : null}
            >
              {convertCurrencyToNumber(row.value) < 0
                ? `${row.value.toString().substring(1)} DB`
                : `${row.value} CR`}
            </div>
          );
        } else {
          return <div></div>;
        }
      },
    },
    {
      accessor: "edit",
      Header: "Edit",
      hideInPrint: true,
      Cell: (row) => {
        if (row.row.id) {
          return (
            <IconButton onClick={() => handleEdit(row.row.id)}>
              <EditIcon />
            </IconButton>
          );
        } else {
          return <div></div>;
        }
      },
    },
    {
      accessor: "delete",
      Header: "Delete",
      hideInPrint: true,
      Cell: (row) => {
        if (row.row.id) {
          return (
            <IconButton onClick={() => handleDelete(row.row.id)}>
              <DeleteIcon />
            </IconButton>
          );
        } else {
          return <div></div>;
        }
      },
    },
  ];
  if (daybookView) {
    COLUMNS[5] = {
      accessor: "person_name",
      Header: "Person",
      Cell: (row) => (
        <div onClick={row.row.id ? () => onRowClick(row.row.id) : null}>
          {row.value}
        </div>
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
      bordered
    />
  );
}

export default LedgerDetail;
