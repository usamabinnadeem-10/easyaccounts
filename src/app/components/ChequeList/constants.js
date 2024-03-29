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
      Header: 'Sr#',
      accessor: 'index',
    },
    {
      Header: 'Serial',
      accessor: 'serial',
    },
    {
      Header: 'Cheque #',
      accessor: 'cheque_number',
    },
    {
      Header: 'Receiving',
      accessor: 'date',
    },
    {
      Header: 'Due Date',
      accessor: 'due_date',
    },
    {
      Header: 'Person',
      accessor: 'person',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
      Cell: (row) => <div>{formatCurrency(row.value)}</div>,
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: (row) => {
        if (row.value) {
          return (
            <CustomChip
              size='small'
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
      Header: 'Transferred to',
      accessor: 'transferred_to',
    },
    {
      Header: 'View',
      accessor: 'view',
      Cell: (row) => {
        if (typeof row.row.id === 'string') {
          return (
            <Tooltip
              placement='top'
              title={isPersonal ? 'View Cheque' : 'View Cheque History'}
              arrow>
              <CustomIconButton
                size='small'
                onClick={() => onClick(row.row.id)}>
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
      Header: 'Actions',
      accessor: 'actions',
      Cell: (row) => {
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
