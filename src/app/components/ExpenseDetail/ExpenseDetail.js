import React from 'react';

import CustomTable from '../CustomTable/CustomTable';

import { IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ExpenseDetail = ({ rows, hoverProperty, handleEdit, handleDelete }) => {
  const COLUMNS = [
    {
      accessor: 'date',
      Header: 'Date',
      Cell: (row) => <div>{row.value}</div>,
    },
    {
      accessor: 'detail',
      Header: 'Detail',
      Cell: (row) => <div>{row.value}</div>,
    },
    {
      accessor: 'amount',
      Header: 'Amount',
      Cell: (row) => <div>{row.value}</div>,
    },
    {
      accessor: 'expense',
      Header: 'Expense Account',
      Cell: (row) => <div>{row.value}</div>,
    },
    {
      accessor: 'account_type',
      Header: 'Account Type',
      Cell: (row) => <div>{row.value}</div>,
    },
    {
      accessor: 'edit',
      Header: 'Edit',
      hideInPrint: true,
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
      hideInPrint: true,
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
};

export default ExpenseDetail;
