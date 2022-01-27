import { IconButton } from "@mui/material";

import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

export const getColumns = (handleClick) => {
  return [
    {
      accessor: "product",
      Header: "Product",
    },
    {
      accessor: "warehouse",
      Header: "Warehouse",
    },
    {
      accessor: "yards_per_piece",
      Header: "Gazaana",
    },
    {
      accessor: "stock_quantity",
      Header: "Stock",
    },
    {
      accessor: "total_gazaana",
      Header: "Total Gazaana",
    },
    {
      accessor: "transfer_button",
      Header: "Transfer",
      hideInPrint: true,
      Cell: (row) => {
        if (row.row.id) {
          return (
            <IconButton onClick={() => handleClick(row.row.id)}>
              <CompareArrowsIcon />
            </IconButton>
          );
        } else {
          return <div></div>;
        }
      },
    },
  ];
};
