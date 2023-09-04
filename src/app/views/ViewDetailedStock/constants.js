import CustomChip from '../../components/CustomChip';

import { Cell } from './styled';

const CHIP_COLORS = {
  paid: 'success',
  credit: 'error',
  maal_wapsi: 'secondary',
  purchase: 'info',
  transfer: 'warning',
};

export const COLUMNS = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: (row) => (
      <Cell
        variant={row.row.original.rowVariant || 'body2'}
        fontWeight={row.row.original.rowFontWeight || 'normal'}
      >
        {row.value}
      </Cell>
    ),
  },
  {
    accessorKey: 'serial',
    header: 'Inv #',
    cell: (row) => {
      return (
        <CustomChip
          size="small"
          color={CHIP_COLORS[row.row.original.transactionType]}
          label={row.value || '---'}
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
    accessorKey: 'manual_serial',
    header: 'Book #',
    cell: (row) => {
      return (
        <CustomChip
          size="small"
          color={CHIP_COLORS[row.row.original.transactionType]}
          label={row.value || '---'}
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
    accessorKey: 'person',
    header: 'Person',
  },
  {
    accessorKey: 'debit',
    header: 'Debit (بنام)',
    color: '#C91D22',
    cell: (row) => (
      <Cell
        variant={row.row.original.rowVariant || 'body2'}
        fontWeight={row.row.original.rowFontWeight || 'normal'}
        textColor="#C91D22"
      >
        {row.value}
      </Cell>
    ),
  },
  {
    accessorKey: 'credit',
    header: 'Credit (جمع)',
    color: '#00A465',
    cell: (row) => (
      <Cell
        variant={row.row.original.rowVariant || 'body2'}
        fontWeight={row.row.original.rowFontWeight || 'normal'}
        textColor="#00A465"
      >
        {row.value}
      </Cell>
    ),
  },
  {
    accessorKey: 'gazaana',
    header: 'Gazaana',
    cell: (row) => (
      <Cell
        variant={row.row.original.rowVariant || 'body2'}
        fontWeight={row.row.original.rowFontWeight || 'normal'}
      >
        {row.value}
      </Cell>
    ),
  },
  {
    accessorKey: 'stock',
    header: 'Balance Thaan',
    cell: (row) => (
      <Cell
        variant={row.row.original.rowVariant || 'body2'}
        fontWeight={row.row.original.rowFontWeight || 'normal'}
      >
        {row.value}
      </Cell>
    ),
  },
  {
    accessorKey: 'gazaanaBalance',
    header: 'Total',
    cell: (row) => (
      <Cell
        variant={row.row.original.rowVariant || 'body2'}
        fontWeight={row.row.original.rowFontWeight || 'normal'}
      >
        {row.value}
      </Cell>
    ),
  },
  {
    accessorKey: 'warehouse',
    header: 'Warehouse',
  },
];
