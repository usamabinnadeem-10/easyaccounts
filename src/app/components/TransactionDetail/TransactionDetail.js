import React, { useMemo } from 'react';

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
  handleEdit,
  handleDelete,
  showWithDetails,
}) {
  const CHIP_COLORS = {
    paid: 'success',
    credit: 'error',
    maal_wapsi: 'secondary',
    purchase: 'info',
  };

  const ClickableCell = ({ row, children }) => {
    return (
      <Box sx={{ cursor: row.hasClick ? 'pointer' : null }}>{children}</Box>
    );
  };

  const BoldCell = ({ value }) => {
    return (
      <Box
        sx={{
          fontWeight: 'bold',
        }}
      >
        {value}
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
      field: 'totalQuantity',
      headerName: '# Thaan',
      type: 'number',
      renderCell: ({ row, value }) => (
        <ClickableCell row={row}>
          {value ? formatCurrency(value) : '---'}
        </ClickableCell>
      ),
    },
    {
      field: 'totalGazaana',
      headerName: 'Gazaana',
      type: 'number',
      renderCell: ({ row, value }) => (
        <ClickableCell row={row}>
          {value ? formatCurrency(value) : '---'}
        </ClickableCell>
      ),
    },
    {
      field: 'total',
      headerName: 'Amount',
      type: 'number',
      renderCell: ({ row, value }) => (
        <ClickableCell row={row}>
          {value ? formatCurrency(value) : '---'}
        </ClickableCell>
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

  const DETAIL_COLUMNS = [
    {
      field: 'manual_serial',
      headerName: 'Book #',
      type: 'number',
      width: 120,
      renderCell: ({ row, value }) => {
        if (!row.hideTransactionData && !row.hideEverything) {
          return <BoldCell value={value || '-'} />;
        }
        if (row.hideEverything) {
          return <Box sx={{ height: '10px' }} />;
        }
        return <></>;
      },
    },
    {
      field: 'serial',
      headerName: 'Serial #',
      width: 150,
      renderCell: ({ row, value }) => {
        if (row.isTotal || row.hasClick) {
          return <BoldCell value={value} />;
        }
        return <div>{value}</div>;
      },
    },
    {
      field: 'person',
      headerName: 'Person',
      width: 150,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 120,
      type: 'date',
      sortable: false,
      renderCell: ({ row, value }) => {
        if (!row.hideTransactionData) {
          return <div>{value && getReadableDate(value)}</div>;
        }
        if (row.isTotal) {
          return <BoldCell value={value} />;
        }
        return <div>{value}</div>;
      },
    },
    {
      field: 'rate',
      headerName: 'Rate',
      type: 'number',
      renderCell: ({ row, value }) => (
        <div>{value ? formatCurrency(value) : ''}</div>
      ),
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      width: 140,
      renderCell: ({ row, value }) => {
        let val = value ? formatCurrency(value) : '';
        if (row.isTotal) {
          return <BoldCell value={val} />;
        }
        return <div>{val}</div>;
      },
    },
  ];

  const columns = useMemo(() => {
    if (!showWithDetails) {
      return COLUMNS;
    } else {
      return DETAIL_COLUMNS;
    }
  }, [showWithDetails]);

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
      columns={columns}
      rows={rows}
      onRowClick={(params) => {
        if (!showWithDetails) {
          onRowClick(params.id);
        }
      }}
    />
  );
}

export default TransactionDetail;
