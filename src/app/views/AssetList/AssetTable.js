import React from 'react';

import CustomTable from '../../components/CustomTable';
import CustomMenu from '../../containers/CustomMenu';

import { convertDate } from '../../utilities/stringUtils';
import { convertCurrencyToNumber } from '../../utilities/stringUtils';

const AssetTable = ({ rows, handleDelete, handleEdit }) => {
  let COLUMNS = [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: (row) => (
        <div>{convertDate('YYYY-MM-DD HH:mm:ss', 'DD-MM-YYYY', row.value)}</div>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'value',
      header: 'Value',
      cell: (row) => <div>{convertCurrencyToNumber(row.value)}</div>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (row) => <div>{row.value === 'P' ? 'Purchased' : 'Sold'}</div>,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: (row) => (
        <div>{`${row.value.charAt(0).toUpperCase() + row.value.slice(1)}`}</div>
      ),
    },
    {
      accessorKey: 'sold_value',
      header: 'Sale price',
      cell: (row) => (
        <div>{`${row.value ? convertCurrencyToNumber(row.value) : '---'}`}</div>
      ),
    },
    {
      accessorKey: 'sold_date',
      header: 'Sale date',
      cell: (row) => (
        <div>{`${
          row.value
            ? convertDate('YYYY-MM-DD HH:mm:ss', 'DD-MM-YYYY', row.value)
            : '---'
        }`}</div>
      ),
    },
    {
      accessorKey: 'delete',
      header: 'Delete',
      hideInPrint: true,
      cell: (row) => {
        return (
          <CustomMenu
            menu={[
              { action: handleEdit, name: 'Edit' },
              { action: handleDelete, name: 'Delete' },
            ]}
            id={row.row.id}
          />
        );
      },
    },
  ];

  return <CustomTable columns={COLUMNS} data={rows} />;
};

export default AssetTable;
