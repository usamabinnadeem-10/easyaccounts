import { Chip } from "@mui/material";

import { Cell } from "./styled";

const CHIP_COLORS = {
  paid: "success",
  credit: "error",
  maal_wapsi: "secondary",
  purchase: "info",
};

export const COLUMNS = [
  {
    accessor: "date",
    Header: "Date",
  },
  {
    accessor: "serial",
    Header: "Inv #",
    Cell: (row) => {
      return (
        <Chip
          size="small"
          color={CHIP_COLORS[row.row.original.transactionType]}
          label={row.value || "---"}
          sx={{
            fontWeight: 700,
            borderRadius: 1.5,
            textTransform: "capitalize",
          }}
        />
      );
    },
  },
  {
    accessor: "bookSerial",
    Header: "Book #",
    Cell: (row) => {
      return (
        <Chip
          size="small"
          color={CHIP_COLORS[row.row.original.transactionType]}
          label={row.value || "---"}
          sx={{
            fontWeight: 700,
            borderRadius: 1.5,
            textTransform: "capitalize",
          }}
        />
      );
    },
  },
  {
    accessor: "person",
    Header: "Person",
  },
  {
    accessor: "debit",
    Header: "Debit (بنام)",
    color: "#C91D22",
    Cell: (row) => <Cell textColor="#C91D22">{row.value}</Cell>,
  },
  {
    accessor: "credit",
    Header: "Credit (جمع)",
    color: "#00A465",
    Cell: (row) => <Cell textColor="#00A465">{row.value}</Cell>,
  },
  {
    accessor: "gazaana",
    Header: "Thaan",
  },
  {
    accessor: "stock",
    Header: "Balance Thaan",
  },
  {
    accessor: "gazaanaBalance",
    Header: "Total",
  },
  {
    accessor: "warehouse",
    Header: "Warehouse",
  },
];
