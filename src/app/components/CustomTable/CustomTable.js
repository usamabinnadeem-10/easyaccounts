import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import { Box } from '@mui/material';

import { useTable, useGroupBy, useExpanded } from 'react-table';

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
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}
                  >
                    {column.canGroupBy ? (
                      // If the column can be grouped, let's add a toggle
                      <>
                        {column.isGrouped ? (
                          <ReorderIcon
                            fontSize="20"
                            color="info"
                            {...column.getGroupByToggleProps()}
                          />
                        ) : (
                          <TableChartIcon
                            fontSize="20"
                            color="info"
                            {...column.getGroupByToggleProps()}
                          />
                        )}
                      </>
                    ) : null}
                    <div>{column.render('Header')}</div>
                  </Box>
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
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                          }}
                          {...row.getToggleRowExpandedProps()}
                        >
                          {row.isExpanded ? (
                            <KeyboardArrowDownIcon fontSize="18" />
                          ) : (
                            <KeyboardArrowRightIcon fontSize="18" />
                          )}
                          {cell.render('Cell')} ({row.subRows.length})
                        </Box>
                      ) : cell.isAggregated ? (
                        cell.render('Aggregated')
                      ) : cell.isPlaceholder ? null : (
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
