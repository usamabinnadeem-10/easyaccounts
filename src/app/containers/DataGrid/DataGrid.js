import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './print.css';

const Toolbar = (props) => {
  return (
    <GridToolbar
      showQuickFilter
      printOptions={{
        hideToolbar: true,
        hideFooter: true,
        disableToolbarButton: true,
      }}
    />
  );
};

const CustomDataGrid = ({
  columns,
  rows,
  showToolbar = true,
  printable = false,
  onClickPrint = null,
  ...props
}) => {
  return (
    <DataGrid
      showCellRightBorder={false}
      rows={rows}
      columns={columns}
      components={{
        Toolbar: showToolbar ? Toolbar : null,
      }}
      density="compact"
      sx={{
        ...props.sx,
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
