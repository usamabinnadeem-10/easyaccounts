import React from 'react';

import { Box } from '@mui/system';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';

import CustomChip from '../../components/CustomChip';
import CustomDataGrid from '../../containers/DataGrid/DataGrid';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { formatCurrency, getReadableDate } from '../../utilities/stringUtils';

function TransactionDetail({
  rows,
  onRowClick,
  hoverProperty,
  handleEdit,
  handleDelete,
}) {
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
      // width: 20,
      flex: 1,
      renderCell: ({ row, value }) => (
        <ClickableCell row={row}>{value}</ClickableCell>
      ),
    },
    {
      field: 'serial',
      headerName: 'Serial #',
      flex: 3,
      renderCell: ({ row, value }) => (
        <ClickableCell row={row}>{value}</ClickableCell>
      ),
    },
    {
      field: 'manual_serial',
      headerName: 'Book #',
      flex: 3,
      renderCell: ({ row, value }) => (
        <ClickableCell row={row}>{value || '---'}</ClickableCell>
      ),
    },
    {
      field: 'person',
      headerName: 'Person',
      flex: 4,
      renderCell: ({ row, value }) => (
        <ClickableCell row={row}>{value}</ClickableCell>
      ),
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      flex: 3,
      renderCell: ({ row, value }) => (
        <ClickableCell row={row}>
          {value && getReadableDate(value)}
        </ClickableCell>
      ),
    },
    {
      field: 'total',
      headerName: 'Amount',
      flex: 3,
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
      flex: 8,
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
      flex: 3,
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
      width: 30,
      getActions: ({ row }) => {
        if (row.hasClick) {
          return [
            <GridActionsCellItem
              showInMenu
              icon={<EditIcon color="primary" />}
              onClick={() => handleEdit(row.id)}
              label="Edit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon color="error" />}
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

  return <CustomDataGrid columns={COLUMNS} rows={rows} />;
}

export default TransactionDetail;
