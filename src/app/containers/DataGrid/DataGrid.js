import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './print.css';

const Toolbar = () => {
  return (
    <GridToolbar
      showQuickFilter
      printOptions={{
        hideToolbar: true,
        hideFooter: true,
      }}
    />
  );
};

const CustomDataGrid = ({
  columns,
  rows,
  showToolbar = true,
  onRowClick = null,
  ...props
}) => {
  return (
    <DataGrid
      onRowClick={(params) => {
        onRowClick && onRowClick(params.row);
      }}
      showCellRightBorder={false}
      rows={rows}
      columns={columns}
      components={{
        Toolbar: showToolbar ? Toolbar : null,
      }}
      density="compact"
      sx={{
        ...props.sx,
        '& .MuiDataGrid-row:hover': {
          cursor: 'pointer',
        },
        '@media print': {
          '.MuiDataGrid-main': {
            fontFamily: 'Poppins',
            border: 'none',
          },
        },
      }}
      {...props}
    />
  );
};

export default CustomDataGrid;
