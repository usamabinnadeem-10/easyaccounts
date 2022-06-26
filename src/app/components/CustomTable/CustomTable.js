import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useTable } from 'react-table';

import { useStyles } from './styles';

function CustomTable({
  columns,
  data,
  hoverProperty,
  noTableStyles,
  pre,
  bordered = false,
}) {
  console.log(data);
  const getRowId = (row) => row.id;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      getRowId,
    });

  console.log(rows);
  const classes = useStyles();

  return (
    <TableContainer
      {...getTableProps()}
      className={`${
        noTableStyles ? classes.noTableStyles : classes.tableWrapper
      }`}>
      <Table size='small'>
        <TableHead className={classes.tableHead}>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  className={`${column.hideInPrint && classes.hideInPrint}
                    ${classes.headCell}`}
                  sx={{
                    color: column.color,
                  }}
                  {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow
                hover
                className={`${
                  row.original[hoverProperty] ? classes.hover : ''
                }`}
                {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell
                      className={`
                      ${classes.rowCell} 
                      ${pre ? classes.pre : ''}
                      ${bordered ? classes.bordered : ''}
                      ${cell.column.hideInPrint && classes.hideInPrint}`}
                      {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;
