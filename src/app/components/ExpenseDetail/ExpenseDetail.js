import React from 'react';

import CustomTable from '../CustomTable/CustomTable';
import CustomIconButton from '../../components/CustomIconButton';

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
      accessor: 'serial',
      Header: 'Serial',
      Cell: (row) => (
        <div>
          {row.value && 'E-'}
          {row.value}
        </div>
      ),
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
};

export default ExpenseDetail;
