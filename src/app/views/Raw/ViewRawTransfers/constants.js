import { GridActionsCellItem } from '@mui/x-data-grid';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const getColumns = ({ handleEdit, handleDelete }) => [
  {
    field: 'serial',
    headerName: 'Serial',
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
