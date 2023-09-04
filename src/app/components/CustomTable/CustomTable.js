import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import { Box } from '@mui/material';

// import { useTable, useGroupBy, useExpanded } from 'react-table';
import {
  GroupingState,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

import TableChartIcon from '@mui/icons-material/TableChart';
import ReorderIcon from '@mui/icons-material/Reorder';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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

  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   rows,
  //   prepareRow,
  //   footerGroups,
  // } = useReactTable(
  //   {
  //     columns,
  //     data,
  //     getRowId,
  //   },
  //   useGroupBy,
  //   useExpanded,
  // );

  const [grouping, setGrouping] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      grouping,
    },
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const classes = useStyles();

  return (
    <TableContainer
      // {...getTableProps()}
      className={`${
        noTableStyles ? classes.noTableStyles : classes.tableWrapper
      }`}
    >
      <Table size="small">
        <TableHead className={classes.tableHead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow>
              {headerGroup.headers.map((header) => (
                <TableCell
                  variant="head"
                  className={`${header.hideInPrint && classes.hideInPrint}
                    ${classes.headCell}`}
                  sx={{
                    color: header.color,
                  }}
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}
                  >
                    {header.column.getCanGroup() ? (
                      // If the column can be grouped, let's add a toggle
                      <>
                        {header.column.getIsGrouped() ? (
                          <ReorderIcon
                            fontSize="20"
                            color="info"
                            onClick={header.column.getToggleGroupingHandler()}
                            // {...column.getGroupByToggleProps()}
                          />
                        ) : (
                          <TableChartIcon
                            fontSize="20"
                            color="info"
                            onClick={header.column.getToggleGroupingHandler()}
                            // {...column.getGroupByToggleProps()}
                          />
                        )}
                      </>
                    ) : null}
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </div>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row, i) => {
            // prepareRow(row);
            return (
              <TableRow
                hover
                // className={`${
                //   row.original[hoverProperty] ? classes.hover : ''
                // }`}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      variant="body"
                      className={`
                      ${classes.rowCell} 
                      ${pre ? classes.pre : ''}
                      ${bordered ? classes.bordered : ''}
                      ${cell.column.hideInPrint && classes.hideInPrint}`}
                    >
                      {/* {cell.render('Cell')} */}
                      {cell.getIsGrouped() ? (
                        // If it's a grouped cell, add an expander and row count
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                          }}
                          // {...row.getToggleRowExpandedProps()}
                          data-expanded={
                            row.isExpanded ? 'tr-expanded' : 'tr-collapsed'
                          }
                        >
                          {row.isExpanded ? (
                            <KeyboardArrowDownIcon fontSize="18" />
                          ) : (
                            <KeyboardArrowRightIcon fontSize="18" />
                          )}
                          {flexRender(
                            cell.column.columnDef.cell ??
                              cell.column.columnDef.cell,
                            cell.getContext(),
                          )}{' '}
                          ({row.subRows.length})
                        </Box>
                      ) : cell.getIsAggregated() ? (
                        flexRender(
                          cell.column.columnDef.aggregatedCell ??
                            cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      ) : cell.getIsPlaceholder() ? null : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter className={classes.tableHead}>
          {table.getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <TableCell
                  className={classes.rowCell}
                  variant="body"
                  // {...header.getFooterProps()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
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
