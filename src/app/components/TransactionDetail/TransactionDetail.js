import React from 'react';

import { Box } from '@mui/system';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';

import CustomChip from '../../components/CustomChip';
import CustomDataGrid from '../../containers/DataGrid/DataGrid';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { formatCurrency, getReadableDate } from '../../utilities/stringUtils';

function TransactionDetail({ rows, onRowClick, handleEdit, handleDelete }) {
  const CHIP_COLORS = {
    paid: 'success',
    credit: 'error',
    maal_wapsi: 'secondary',
    purchase: 'info',
  };

  const ClickableCell = ({ row, children }) => {
    return (
      <Box
        sx={{ cursor: row.hasClick ? 'pointer' : null }}
        onClick={row.id && row.hasClick ? () => onRowClick(row.id) : null}
      >
        {children}
      </Box>
    );
  };

  const COLUMNS = [
    {
      field: 'index',
      headerName: 'Sr #',
      width: 30,
      renderCell: ({ row, value }) => (
        <ClickableCell row={row}>{value}</ClickableCell>
      ),
    },
    {
      field: 'serial',
      headerName: 'Serial #',
      renderCell: ({ row, value }) => (
        <ClickableCell row={row}>{value}</ClickableCell>
      ),
    },
    {
      field: 'manual_serial',
      headerName: 'Book #',
      type: 'number',
      width: 120,
      renderCell: ({ row, value }) => (
        <ClickableCell row={row}>{value || '---'}</ClickableCell>
      ),
    },
    {
      field: 'wasooli_number',
      headerName: 'Wasooli #',
      type: 'number',
      renderCell: ({ row, value }) => (
        <ClickableCell row={row}>{value || '---'}</ClickableCell>
      ),
    },
    {
      field: 'builty',
      headerName: 'Builty #',
      width: 120,
      renderCell: ({ row, value }) => (
        <ClickableCell row={row}>{value || '---'}</ClickableCell>
      ),
    },
    {
      field: 'person',
      headerName: 'Person',
      width: 200,
      renderCell: ({ row, value }) => (
        <ClickableCell row={row}>{value}</ClickableCell>
      ),
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 120,
      type: 'date',
      renderCell: ({ row, value }) => (
        <ClickableCell row={row}>
          {value && getReadableDate(value)}
        </ClickableCell>
      ),
    },
    {
      field: 'total',
      headerName: 'Amount',
      type: 'number',
      renderCell: ({ row, value }) => (
        <ClickableCell row={row}>{formatCurrency(value)}</ClickableCell>
      ),
    },
    // {
    //   field: 'discount',
    //   headerName: 'Discount',
    //   renderCell: ({row, value}) => (
    //     <div onClick={row.id && row.hasClick ? () => onRowClick(row.id) : null}>
    //       {formatCurrency(row)}
    //     </div>
    //   ),
    // },
    {
      field: 'detail',
      headerName: 'Detail',
      width: 300,
      renderCell: ({ row, value }) => (
        <ClickableCell row={row}>
          <Tooltip arrow title={value || ''}>
            <Box>{value || '---'}</Box>
          </Tooltip>
        </ClickableCell>
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      type: 'singleSelect',
      valueOptions: [
        {
          value: 'credit',
          label: 'Credit',
        },
        {
          value: 'paid',
          label: 'Paid',
        },
        {
          value: 'purchase',
          label: 'Purchase',
        },
        {
          value: 'maal_wapsi',
          label: 'Maal wapsi',
        },
      ],
      renderCell: ({ row, value }) => {
        return (
          <ClickableCell row={row}>
            {row.id && row.hasClick ? (
              <CustomChip
                size="small"
                color={CHIP_COLORS[value]}
                label={value?.replace('_', ' ')}
                sx={{
                  fontSize: '10px',
                  fontWeight: 900,
                  borderRadius: 1.5,
                  textTransform: 'capitalize',
                }}
              />
            ) : (
              <></>
            )}
          </ClickableCell>
        );
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '✅',
      filterable: false,
      width: 30,
      disableExport: true,
      getActions: ({ row }) => {
        if (row.hasClick) {
          return [
            <GridActionsCellItem
              showInMenu
              icon={<EditIcon fontSize="small" color="primary" />}
              onClick={() => handleEdit(row.id)}
              label="Edit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon fontSize="small" color="error" />}
              onClick={() => handleDelete(row.id)}
              label="Delete"
              showInMenu
            />,
          ];
        }
        return [];
      },
    },
  ];

  return (
    <CustomDataGrid
      getRowHeight={() => 'auto'}
      sx={{
        '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '4px' },
        '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '8px' },
        '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
          py: '16px',
        },
      }}
      initialState={{
        columns: {
          columnVisibilityModel: {
            index: false,
            builty: false,
          },
        },
      }}
      columns={COLUMNS}
      rows={rows}
    />
  );
}

export default TransactionDetail;
