import { Chip } from '@mui/material';

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
    accessor: 'date',
    Header: 'Date',
    Cell: (row) => (
      <Cell
        variant={row.row.original.rowVariant || 'body2'}
        fontWeight={row.row.original.rowFontWeight || 'normal'}>
        {row.value}
      </Cell>
    ),
  },
  {
    accessor: 'serial',
    Header: 'Inv #',
    Cell: (row) => {
      return (
        <Chip
          size='small'
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
    accessor: 'manual_serial',
    Header: 'Book #',
    Cell: (row) => {
      return (
        <Chip
          size='small'
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
    accessor: 'person',
    Header: 'Person',
  },
  {
    accessor: 'debit',
    Header: 'Debit (بنام)',
    color: '#C91D22',
    Cell: (row) => (
      <Cell
        variant={row.row.original.rowVariant || 'body2'}
        fontWeight={row.row.original.rowFontWeight || 'normal'}
        textColor='#C91D22'>
        {row.value}
      </Cell>
    ),
  },
  {
    accessor: 'credit',
    Header: 'Credit (جمع)',
    color: '#00A465',
    Cell: (row) => (
      <Cell
        variant={row.row.original.rowVariant || 'body2'}
        fontWeight={row.row.original.rowFontWeight || 'normal'}
        textColor='#00A465'>
        {row.value}
      </Cell>
    ),
  },
  {
    accessor: 'gazaana',
    Header: 'Gazaana',
    Cell: (row) => (
      <Cell
        variant={row.row.original.rowVariant || 'body2'}
        fontWeight={row.row.original.rowFontWeight || 'normal'}>
        {row.value}
      </Cell>
    ),
  },
  {
    accessor: 'stock',
    Header: 'Balance Thaan',
    Cell: (row) => (
      <Cell
        variant={row.row.original.rowVariant || 'body2'}
        fontWeight={row.row.original.rowFontWeight || 'normal'}>
        {row.value}
      </Cell>
    ),
  },
  {
    accessor: 'gazaanaBalance',
    Header: 'Total',
    Cell: (row) => (
      <Cell
        variant={row.row.original.rowVariant || 'body2'}
        fontWeight={row.row.original.rowFontWeight || 'normal'}>
        {row.value}
      </Cell>
    ),
  },
  {
    accessor: 'warehouse',
    Header: 'Warehouse',
  },
];
