import React from "react";

import { useTable } from "react-table";

import { useStyles } from "./styles";

function CustomTable({ columns, data, hoverProperty, noTableStyles, pre }) {
  const getRowId = (row) => row.id;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      getRowId,
    });

  const classes = useStyles();

  return (
    <table
      {...getTableProps()}
      className={`${
        noTableStyles ? classes.noTableStyles : classes.tableWrapper
      }`}
    >
      <thead className={classes.tableHead}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th className={classes.headCell} {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              className={`${row.original[hoverProperty] ? classes.hover : ""}`}
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                return (
                  <td
                    className={`${classes.rowCell} ${pre ? classes.pre : ""}`}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CustomTable;
