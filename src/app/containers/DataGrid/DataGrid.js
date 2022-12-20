import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { DataGridWrapper } from './styled';

const generateData = (numRows = 100) => {
  return Array.from(Array(numRows).keys()).map((i) => ({
    id: i,
    name: `Task ${i}`,
    done: Math.random(),
  }));
};

const colDef = [
  {
    field: 'id',
    headerName: 'ID',
  },
  {
    field: 'name',
    headerName: 'Name',
  },
  {
    field: 'done',
    headerName: 'Done',
    type: 'number',
  },
];

const CustomDataGrid = ({ columns, rows, showToolbar = true }) => {
  return (
    <DataGridWrapper container>
      <DataGrid
        rows={generateData()}
        columns={colDef}
        components={{
          Toolbar: showToolbar ? GridToolbar : null,
        }}
      />
    </DataGridWrapper>
  );
};

export default CustomDataGrid;
