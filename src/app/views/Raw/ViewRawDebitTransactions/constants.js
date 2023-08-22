import moment from 'moment';

import { GridActionsCellItem } from '@mui/x-data-grid';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const getColumns = ({ handleEdit, handleDelete }) => [
  {
    field: 'serial',
    headerName: 'Serial',
  },
  {
    field: 'party',
    headerName: 'Party',
    valueGetter: ({ row }) => row.party.label,
    width: 200,
  },
  {
    field: 'numLots',
    headerName: 'Total Lots',
    type: 'number',
  },
  {
    field: 'numThaans',
    headerName: 'Total Thaan',
    type: 'number',
  },
  {
    field: 'debit_type',
    headerName: 'Type',
  },
  {
    field: 'date',
    headerName: 'Date',
    type: 'date',
    valueGetter: ({ row }) => moment(row.date),
    renderCell: ({ row, value }) => <div>{value.format('DD-MM-YYYY')}</div>,
    width: 200,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: '✅',
    filterable: false,
    width: 30,
    disableExport: true,
    getActions: (params) => {
      return [
        <GridActionsCellItem
          showInMenu
          icon={<EditIcon fontSize="small" color="primary" />}
          onClick={() => handleEdit(params.id)}
          label="Edit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon fontSize="small" color="error" />}
          onClick={() => handleDelete(params.id)}
          label="Delete"
          showInMenu
        />,
      ];
    },
  },
];
