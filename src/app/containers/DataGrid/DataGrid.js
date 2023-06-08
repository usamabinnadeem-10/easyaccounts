import React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExportContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridCsvExportMenuItem,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
} from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import './print.css';

const getRows = (apiRef) => {
  // Select rows and columns
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

  // Format the data. Here we only keep the value
  const data = filteredSortedRowIds.map((id) => {
    const row = {};
    visibleColumnsField.forEach((field) => {
      row[field] = apiRef.current.getCellParams(id, field).value;
    });
    return row;
  });

  return data;
};

const getJson = (apiRef) => {
  return JSON.stringify(getRows(apiRef), null, 2);
};

const exportBlob = (blob, filename) => {
  // Save the blob in a json file
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  });
};

function JSONExportMenuItem(props) {
  const { hideMenu } = props;
  const apiRef = useGridApiContext();

  return (
    <MenuItem
      onClick={() => {
        const jsonString = getJson(apiRef);
        const blob = new Blob([jsonString], {
          type: 'text/json',
        });
        exportBlob(blob, 'data.json');
        hideMenu?.();
      }}
    >
      Export JSON
    </MenuItem>
  );
}

function PdfExportMenuItem(props) {
  const { onClickPrint, hideMenu } = props;
  const apiRef = useGridApiContext();

  return (
    <MenuItem
      onClick={() => {
        onClickPrint(getJson(apiRef));
        hideMenu?.();
      }}
    >
      Print
    </MenuItem>
  );
}

const CustomExportDropdown = (props) => {
  const { printable, onClickPrint } = props;
  return (
    <GridToolbarExportContainer>
      <GridCsvExportMenuItem />
      <JSONExportMenuItem />
      {printable && <PdfExportMenuItem onClickPrint={onClickPrint} />}
    </GridToolbarExportContainer>
  );
};

const Toolbar = (props) => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <CustomExportDropdown {...props} />
    </GridToolbarContainer>
    // <GridToolbar
    //   showQuickFilter
    //   printOptions={{
    //     hideToolbar: true,
    //     hideFooter: true,
    //     disableToolbarButton: true,
    //   }}
    // />
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
      componentsProps={{
        toolbar: {
          printable,
          onClickPrint,
        },
      }}
      {...props}
    />
  );
};

export default CustomDataGrid;
