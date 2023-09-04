import React from 'react';

import CustomChip from '../../components/CustomChip';
import CustomTable from '../../components/CustomTable';
import CustomMenu from '../../containers/CustomMenu';

import { convertDate } from '../../utilities/stringUtils';
import { formatCurrency } from '../../utilities/stringUtils';

import { NATURES } from './constants';

const PaymentTable = ({
  rows,
  persons,
  accounts,
  handleDelete,
  handleEdit,
  handleView,
}) => {
  let COLUMNS = [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: (row) => (
        <div>{convertDate('YYYY-MM-DD HH:mm:ss', 'DD-MM-YYYY', row.value)}</div>
      ),
    },
    {
      accessorKey: 'serial',
      header: 'Serial',
    },
    {
      accessorKey: 'person',
      header: 'Person',
      cell: (row) => <div>{persons?.[row.value]?.label}</div>,
    },
    {
      accessorKey: 'nature',
      header: 'Nature',
      cell: (row) => {
        return (
          <CustomChip
            size="small"
            color={NATURES[row.value].color}
            label={NATURES[row.value].label}
            sx={{
              fontWeight: 900,
              borderRadius: 1.5,
              textTransform: 'capitalize',
            }}
          />
        );
      },
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: (row) => <div>{formatCurrency(row.value)}</div>,
    },
    {
      accessorKey: 'detail',
      header: 'Detail',
      cell: (row) => <div>{row.value || '---'}</div>,
    },
    {
      accessorKey: 'account_type',
      header: 'Account',
      cell: (row) => <div>{accounts?.[row.value]?.label || '---'}</div>,
    },
    {
      accessorKey: 'delete',
      header: 'Delete',
      hideInPrint: true,
      cell: (row) => {
        return (
          <CustomMenu
            menu={[
              { action: handleView, name: 'View payment' },
              { action: handleEdit, name: 'Edit payment' },
              { action: handleDelete, name: 'Delete payment' },
            ]}
            id={row.row.id}
          />
        );
      },
    },
  ];

  return <CustomTable columns={COLUMNS} data={rows} />;
};

export default PaymentTable;
