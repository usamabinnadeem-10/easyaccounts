import { getReadableDate } from "../../utilities/stringUtils";

export const COLUMNS = [
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Date",
    accessor: "date",
    Cell: (row) => <div>{row.value ? getReadableDate(row.value) : "---"}</div>,
  },
  {
    Header: "Debit",
    accessor: "debit",
  },
  {
    Header: "Credit",
    accessor: "credit",
  },
  {
    Header: "Balance",
    accessor: "balance",
  },
];
