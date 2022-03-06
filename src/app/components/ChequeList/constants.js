import { Chip } from "@mui/material";
import { IconButton } from "@mui/material";
import { Tooltip } from "@mui/material";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import ChequeActionMenu from "../../components/ChequeActionMenu";

import { formatCurrency } from "../../utilities/stringUtils";
import { capitalizeFirstLetter } from "../../utilities/stringUtils";

import { STATUS_COLORS } from "../Cheque/constants";

export const getColumns = (onClick, isPersonal) => {
  return [
    {
      Header: "Serial",
      accessor: "serial",
    },
    {
      Header: "Cheque Number",
      accessor: "cheque_number",
    },
    {
      Header: "Due Date",
      accessor: "due_date",
    },
    {
      Header: "Person",
      accessor: "person",
    },
    {
      Header: "Amount",
      accessor: "amount",
      Cell: (row) => <div>{formatCurrency(row.value)}</div>,
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: (row) => {
        if (row.value) {
          return (
            <Chip
              size="small"
              label={capitalizeFirstLetter(row.value.replace("_", " "))}
              color={STATUS_COLORS[row.value]}
              sx={{ fontWeight: 700 }}
            />
          );
        } else {
          return <div></div>;
        }
      },
    },
    {
      Header: "View",
      accessor: "view",
      Cell: (row) => {
        if (typeof row.row.id === "string") {
          return (
            <Tooltip
              placement="top"
              title={isPersonal ? "View Cheque" : "View Cheque History"}
              arrow
            >
              <IconButton size="small" onClick={() => onClick(row.row.id)}>
                <OpenInNewIcon />
              </IconButton>
            </Tooltip>
          );
        } else {
          return <div></div>;
        }
      },
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: (row) => {
        if (typeof row.row.id === "string") {
          return (
            <ChequeActionMenu
              chequeStatus={row.row.values.status}
              chequeId={row.row.id}
              isPersonal={isPersonal}
              chequeSerial={row.row.values.serial}
            />
          );
        } else {
          return <div></div>;
        }
      },
    },
  ];
};
