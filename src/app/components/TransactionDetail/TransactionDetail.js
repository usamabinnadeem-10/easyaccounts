import React from 'react';

import CustomTable from '../CustomTable/CustomTable';
import CustomChip from '../../components/CustomChip';
import CustomIconButton from '../../components/CustomIconButton';

import { IconButton } from '@mui/material';

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
      accessor: 'index',
      Header: 'Sr #',
      Cell: (row) => (
        <div onClick={row.row.id ? () => onRowClick(row.row.id) : null}>
          {row.value}
        </div>
      ),
    },
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
      accessor: 'person',
      Header: 'Person',
      Cell: (row) => (
        <div onClick={row.row.id ? () => onRowClick(row.row.id) : null}>
          {row.value}
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
    // {
    //   accessor: 'discount',
    //   Header: 'Discount',
    //   Cell: (row) => (
    //     <div onClick={row.row.id ? () => onRowClick(row.row.id) : null}>
    //       {formatCurrency(row.value)}
    //     </div>
    //   ),
    // },
    {
      accessor: 'type',
      Header: 'Type',
      Cell: (row) => {
        if (row.row.id) {
          return (
            <CustomChip
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
      hideInPrint: true,
      Cell: (row) => {
        if (row.row.id) {
          return (
            <CustomIconButton onClick={() => handleEdit(row.row.id)}>
              <EditIcon />
            </CustomIconButton>
          );
        } else {
          return <div></div>;
        }
      },
    },
    {
      accessor: 'delete',
      Header: 'Delete',
      hideInPrint: true,
      Cell: (row) => {
        if (row.row.id) {
          return (
            <CustomIconButton onClick={() => handleDelete(row.row.id)}>
              <DeleteIcon />
            </CustomIconButton>
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
