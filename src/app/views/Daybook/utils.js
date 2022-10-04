import { convertDate, formatCurrency } from '../../utilities/stringUtils';

import CustomChip from '../../components/CustomChip';

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
      Cell: (row) => {
        let CHIP = {
          C: {
            color: 'success',
            label: 'Credit',
          },
          D: {
            color: 'error',
            label: 'Debit',
          },
        };
        return (
          <CustomChip
            color={CHIP[row.value].color}
            label={CHIP[row.value].label}
            size='small'
            sx={{
              fontWeight: 700,
              borderRadius: 1.5,
              textTransform: 'capitalize',
            }}
          />
        );
      },
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

export const getTotalSale = (transactions) => {
  let sale = transactions.reduce(
    (prev, curr) =>
      prev +
      curr.transaction_detail.reduce(
        (p, c) => p + c.rate * c.yards_per_piece * c.quantity,
        0
      ),
    0
  );
  let discount = transactions.reduce((prev, curr) => prev + curr.discount, 0);
  return sale - discount;
};
