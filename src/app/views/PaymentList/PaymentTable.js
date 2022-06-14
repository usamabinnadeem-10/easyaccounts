import React from 'react';

import CustomTable from '../../components/CustomTable';
import CustomMenu from '../../containers/CustomMenu';

import { convertDate } from '../../utilities/stringUtils';

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
      accessor: 'date',
      Header: 'Date',
      Cell: (row) => (
        <div>{convertDate('YYYY-MM-DD HH:mm:ss', 'DD-MM-YYYY', row.value)}</div>
      ),
    },
    {
      accessor: 'serial',
      Header: 'Serial',
    },
    {
      accessor: 'person',
      Header: 'Person',
      Cell: (row) => <div>{persons?.[row.value]?.label}</div>,
    },
    {
      accessor: 'nature',
      Header: 'Nature',
    },
    {
      accessor: 'amount',
      Header: 'Amount',
    },
    {
      accessor: 'account_type',
      Header: 'Account',
      Cell: (row) => <div>{accounts?.[row.value]?.label || '---'}</div>,
    },
    {
      accessor: 'delete',
      Header: 'Delete',
      hideInPrint: true,
      Cell: (row) => {
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
