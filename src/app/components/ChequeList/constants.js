import { Tooltip } from '@mui/material';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import ChequeActionMenu from '../../components/ChequeActionMenu';
import CustomChip from '../../components/CustomChip';
import CustomIconButton from '../../components/CustomIconButton';

import { formatCurrency } from '../../utilities/stringUtils';
import { capitalizeFirstLetter } from '../../utilities/stringUtils';

import { STATUS_COLORS } from '../Cheque/constants';
import { STATUS_VARIANTS } from '../Cheque/constants';

export const getColumns = (onClick, isPersonal) => {
  return [
    {
      header: 'Sr#',
      accessorKey: 'index',
    },
    {
      header: 'Serial',
      accessorKey: 'serial',
    },
    {
      header: 'Cheque #',
      accessorKey: 'cheque_number',
    },
    {
      header: 'Receiving',
      accessorKey: 'date',
    },
    {
      header: 'Due Date',
      accessorKey: 'due_date',
    },
    {
      header: 'Person',
      accessorKey: 'person',
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
      cell: (row) => <div>{formatCurrency(row.value)}</div>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        if (row.value) {
          return (
            <CustomChip
              size="small"
              label={capitalizeFirstLetter(row.value.replace('_', ' '))}
              color={STATUS_COLORS[row.value]}
              variant={STATUS_VARIANTS[row.value]}
              sx={{ fontWeight: 700 }}
            />
          );
        } else {
          return <div></div>;
        }
      },
    },
    {
      header: 'Transferred to',
      accessorKey: 'transferred_to',
    },
    {
      header: 'View',
      accessorKey: 'view',
      cell: (row) => {
        if (typeof row.row.id === 'string') {
          return (
            <Tooltip
              placement="top"
              title={isPersonal ? 'View Cheque' : 'View Cheque History'}
              arrow
            >
              <CustomIconButton
                size="small"
                onClick={() => onClick(row.row.id)}
              >
                <OpenInNewIcon />
              </CustomIconButton>
            </Tooltip>
          );
        } else {
          return <div></div>;
        }
      },
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      cell: (row) => {
        if (typeof row.row.id === 'string') {
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
