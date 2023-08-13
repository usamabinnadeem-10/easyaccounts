import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';

import { useTable, useGroupBy, useExpanded } from 'react-table';

import { useStyles } from './styles';

function CustomTable({
  columns,
  data,
  hoverProperty,
  noTableStyles,
  pre,
  bordered = false,
}) {
  const getRowId = (row) => row.id;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  } = useTable(
    {
      columns,
      data,
      getRowId,
    },
    useGroupBy,
    useExpanded,
  );

  const classes = useStyles();

  return (
    <TableContainer
      {...getTableProps()}
      className={`${
        noTableStyles ? classes.noTableStyles : classes.tableWrapper
      }`}
    >
      <Table size="small">
        <TableHead className={classes.tableHead}>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  variant="head"
                  className={`${column.hideInPrint && classes.hideInPrint}
                    ${classes.headCell}`}
                  sx={{
                    color: column.color,
                  }}
                  {...column.getHeaderProps()}
                >
                  {column.canGroupBy ? (
                    // If the column can be grouped, let's add a toggle
                    <span {...column.getGroupByToggleProps()}>
                      {column.isGrouped ? '🛑 ' : '👊 '}
                    </span>
                  ) : null}
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
                // className={`${
                //   row.original[hoverProperty] ? classes.hover : ''
                // }`}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <TableCell
                      variant="body"
                      className={`
                      ${classes.rowCell} 
                      ${pre ? classes.pre : ''}
                      ${bordered ? classes.bordered : ''}
                      ${cell.column.hideInPrint && classes.hideInPrint}`}
                      {...cell.getCellProps()}
                    >
                      {/* {cell.render('Cell')} */}
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? '👇' : '👉'}
                          </span>{' '}
                          {cell.render('Cell')} ({row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render('Aggregated')
                      ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        cell.render('Cell')
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter className={classes.tableHead}>
          {footerGroups.map((group) => (
            <TableRow {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <TableCell
                  className={classes.rowCell}
                  variant="body"
                  {...column.getFooterProps()}
                >
                  {column.render('Footer')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;
