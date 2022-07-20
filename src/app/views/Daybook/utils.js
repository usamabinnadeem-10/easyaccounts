import { convertDate, formatCurrency } from '../../utilities/stringUtils';

export const getLedgerDetailTable = (persons, accountTypes) => {
  return [
    {
      accessor: 'date',
      Header: 'Date',
      Cell: (row) => (
        <div>{convertDate('YYYY-MM-DD HH:mm:ss', 'DD-MM-YYYY', row.value)}</div>
      ),
    },
    {
      accessor: 'person',
      Header: 'Person',
      Cell: (row) => <div>{persons?.[row.value]?.label}</div>,
    },
    {
      accessor: 'amount',
      Header: 'Amount',
      Cell: (row) => <div>{formatCurrency(row.value)}</div>,
    },
    {
      accessor: 'nature',
      Header: 'Nature',
      Cell: (row) => <div>{row.value === 'C' ? 'Credit' : 'Debit'}</div>,
    },
    {
      accessor: 'detail',
      Header: 'Detail',
    },
    {
      accessor: 'account_type',
      Header: 'Account',
      Cell: (row) => <div>{accountTypes?.[row.value]?.label || '---'}</div>,
    },
  ];
};
