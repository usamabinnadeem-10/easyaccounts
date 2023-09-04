import React from 'react';

import CustomTable from '../CustomTable/CustomTable';
import CustomIconButton from '../../components/CustomIconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ExpenseDetail = ({ rows, hoverProperty, handleEdit, handleDelete }) => {
  const COLUMNS = [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: (row) => <div>{row.value}</div>,
    },
    {
      accessorKey: 'serial',
      header: 'Serial',
      cell: (row) => (
        <div>
          {row.value && 'E-'}
          {row.value}
        </div>
      ),
    },
    {
      accessorKey: 'detail',
      header: 'Detail',
      cell: (row) => <div>{row.value}</div>,
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: (row) => <div>{row.value}</div>,
    },
    {
      accessorKey: 'expense',
      header: 'Expense Account',
      cell: (row) => <div>{row.value}</div>,
    },
    {
      accessorKey: 'account_type',
      header: 'Account Type',
      cell: (row) => <div>{row.value}</div>,
    },
    {
      accessorKey: 'edit',
      header: 'Edit',
      hideInPrint: true,
      cell: (row) => {
        if (row.row.id && typeof row.row.id === 'string') {
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
      accessorKey: 'delete',
      header: 'Delete',
      hideInPrint: true,
      cell: (row) => {
        if (row.row.id && typeof row.row.id === 'string') {
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
};

export default ExpenseDetail;
