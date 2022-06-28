import React from 'react';

import CustomTable from '../../components/CustomTable';
import CustomMenu from '../../containers/CustomMenu';

import { convertDate } from '../../utilities/stringUtils';
import { convertCurrencyToNumber } from '../../utilities/stringUtils';

const AssetTable = ({ rows, handleDelete, handleEdit }) => {
  let COLUMNS = [
    {
      accessor: 'date',
      Header: 'Date',
      Cell: (row) => (
        <div>{convertDate('YYYY-MM-DD HH:mm:ss', 'DD-MM-YYYY', row.value)}</div>
      ),
    },
    {
      accessor: 'name',
      Header: 'Name',
    },
    {
      accessor: 'value',
      Header: 'Value',
      Cell: (row) => <div>{convertCurrencyToNumber(row.value)}</div>,
    },
    {
      accessor: 'status',
      Header: 'Status',
      Cell: (row) => <div>{row.value === 'P' ? 'Purchased' : 'Sold'}</div>,
    },
    {
      accessor: 'type',
      Header: 'Type',
      Cell: (row) => (
        <div>{`${row.value.charAt(0).toUpperCase() + row.value.slice(1)}`}</div>
      ),
    },
    {
      accessor: 'delete',
      Header: 'Delete',
      hideInPrint: true,
      Cell: (row) => {
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
