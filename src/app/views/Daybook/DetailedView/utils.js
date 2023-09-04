import { convertDate, formatCurrency } from '../../../utilities/stringUtils';

import CustomChip from '../../../components/CustomChip';

export const getLedgerDetailTable = (persons, accountTypes) => {
  return [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: (row) => (
        <div>{convertDate('YYYY-MM-DD HH:mm:ss', 'DD-MM-YYYY', row.value)}</div>
      ),
    },
    {
      accessorKey: 'person',
      header: 'Person',
      cell: (row) => <div>{persons?.[row.value]?.label}</div>,
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: (row) => <div>{formatCurrency(row.value)}</div>,
    },
    {
      accessorKey: 'nature',
      header: 'Nature',
      cell: (row) => {
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
            size="small"
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
      accessorKey: 'detail',
      header: 'Detail',
    },
    {
      accessorKey: 'account_type',
      header: 'Account',
      cell: (row) => <div>{accountTypes?.[row.value]?.label || '---'}</div>,
    },
  ];
};
