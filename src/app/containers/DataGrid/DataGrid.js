import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { DataGridWrapper } from './styled';

import './print.css';

const Toolbar = ({ printFields }) => {
  return (
    <GridToolbar
      showQuickFilter
      printOptions={{
        hideToolbar: true,
        hideFooter: true,
        fields: printFields ?? null,
        bodyClassName: 'print',
      }}
    />
  );
};

const CustomDataGrid = ({ columns, rows, showToolbar = true, ...props }) => {
  return (
    <DataGridWrapper container>
      <DataGrid
        showCellRightBorder={false}
        rows={rows}
        columns={columns}
        components={{
          Toolbar: showToolbar ? Toolbar : null,
        }}
        density="compact"
        sx={{
          '& .MuiDataGrid-main': {
            height: '100%',
            fontFamily: 'Poppins',
          },
        }}
        {...props}
      />
    </DataGridWrapper>
  );
};

export default CustomDataGrid;
