import React from 'react';

import CustomTable from '../CustomTable/CustomTable';

import { IconButton } from '@mui/material';
import { Chip } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { formatCurrency } from '../../utilities/stringUtils';

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

  const COLUMNS = [
    {
      accessor: 'serial',
      Header: 'Serial #',
      Cell: (row) => (
        <div onClick={row.row.id ? () => onRowClick(row.row.id) : null}>
          {row.value}
        </div>
      ),
    },
    {
      accessor: 'manual_serial',
      Header: 'Book #',
      Cell: (row) => (
        <div onClick={row.row.id ? () => onRowClick(row.row.id) : null}>
          {row.value || '---'}
        </div>
      ),
    },
    {
      accessor: 'date',
      Header: 'Date',
      Cell: (row) => (
        <div onClick={row.row.id ? () => onRowClick(row.row.id) : null}>
          {row.value}
        </div>
      ),
    },
    {
      accessor: 'total',
      Header: 'Amount',
      Cell: (row) => (
        <div onClick={row.row.id ? () => onRowClick(row.row.id) : null}>
          {formatCurrency(row.value)}
        </div>
      ),
    },
    {
      accessor: 'discount',
      Header: 'Discount',
      Cell: (row) => (
        <div onClick={row.row.id ? () => onRowClick(row.row.id) : null}>
          {formatCurrency(row.value)}
        </div>
      ),
    },
    {
      accessor: 'type',
      Header: 'Type',
      Cell: (row) => {
        if (row.row.id) {
          return (
            <Chip
              size='small'
              color={CHIP_COLORS[row.value]}
              label={row.value?.replace('_', ' ')}
              sx={{
                fontWeight: 900,
                borderRadius: 1.5,
                textTransform: 'capitalize',
              }}
            />
          );
        } else {
          return <div></div>;
        }
      },
    },
    {
      accessor: 'edit',
      Header: 'Edit',
      Cell: (row) => {
        if (row.row.id) {
          return (
            <IconButton onClick={() => handleEdit(row.row.id)}>
              <EditIcon />
            </IconButton>
          );
        } else {
          return <div></div>;
        }
      },
    },
    {
      accessor: 'delete',
      Header: 'Delete',
      Cell: (row) => {
        if (row.row.id) {
          return (
            <IconButton onClick={() => handleDelete(row.row.id)}>
              <DeleteIcon />
            </IconButton>
          );
        } else {
          return <div></div>;
        }
      },
    },
  ];

  return (
    <CustomTable columns={COLUMNS} data={rows} hoverProperty={hoverProperty} />
  );
}

export default TransactionDetail;
