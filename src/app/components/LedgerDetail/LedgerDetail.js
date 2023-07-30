import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import CustomTable from '../CustomTable/CustomTable';
import CustomIconButton from '../../components/CustomIconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useStyles } from './styles';

import { convertCurrencyToNumber } from '../../utilities/stringUtils';

function LedgerDetail({
  rows,
  onRowClick,
  hoverProperty,
  handleEdit,
  handleDelete,
  daybookView,
  hideDetails,
}) {
  let COLUMNS = [
    {
      accessor: 'date',
      Header: 'Date',
      Cell: (row) => (
        <div onClick={row.row.id ? () => onRowClick(row.row.id) : null}>
          {row.value}
        </div>
      ),
    },
    {
      accessor: 'serial',
      Header: 'Serial #',
      Cell: (row) => (
        <div onClick={row.row.id ? () => onRowClick(row.row.id) : null}>
          {row.value || '--'}
        </div>
      ),
    },
    {
      accessor: 'detail',
      Header: 'Detail',
      Cell: (row) => (
        <div onClick={row.row.id ? () => onRowClick(row.row.id) : null}>
          {row.value}
        </div>
      ),
    },
    {
      accessor: 'debit',
      Header: 'Debit (بنام)',
      color: '#C91D22',
      Cell: (row) => (
        <div
          className={
            row.row?.original?.serial?.startsWith('MW')
              ? classes.maalWapsi
              : classes.debit
          }
          onClick={row.row.id ? () => onRowClick(row.row.id) : null}
        >
          {row.value}
        </div>
      ),
    },
    {
      accessor: 'credit',
      Header: 'Credit (جمع)',
      color: '#00A465',
      Cell: (row) => (
        <div
          className={
            row.row?.original?.serial?.startsWith('MW')
              ? classes.maalWapsi
              : classes.credit
          }
          onClick={row.row.id ? () => onRowClick(row.row.id) : null}
        >
          {row.value}
        </div>
      ),
    },
  ];

  if (!daybookView) {
    COLUMNS = [
      ...COLUMNS,
      {
        accessor: 'balance',
        Header: 'Balance',
        Cell: (row) => {
          if (typeof row.row.id === 'string') {
            return (
              <div
                className={`${
                  convertCurrencyToNumber(row.value) < 0
                    ? classes.debit
                    : classes.credit
                }`}
                onClick={row.row.id ? () => onRowClick(row.row.id) : null}
              >
                {convertCurrencyToNumber(row.value) < 0
                  ? `${row.value.toString().substring(1)} DB`
                  : `${row.value} CR`}
              </div>
            );
          } else {
            return <div></div>;
          }
        },
      },
    ];
  }

  if (daybookView) {
    COLUMNS = [
      ...COLUMNS,
      {
        accessor: 'person_name',
        Header: 'Person',
        Cell: (row) => (
          <div onClick={row.row.id ? () => onRowClick(row.row.id) : null}>
            {row.value}
          </div>
        ),
      },
    ];
  }

  COLUMNS = [
    ...COLUMNS,
    {
      accessor: 'edit',
      Header: 'Edit',
      hideInPrint: true,
      Cell: (row) => {
        let values = row.row.original;
        if (values.ledger_detail_id) {
          return (
            <CustomIconButton
              size="small"
              onClick={() => handleEdit(row.row.id)}
            >
              <EditIcon />
            </CustomIconButton>
          );
        } else {
          return <div></div>;
        }
      },
    },
    {
      accessor: 'delete',
      Header: 'Delete',
      hideInPrint: true,
      Cell: (row) => {
        let values = row.row.original;
        if (values.ledger_detail_id) {
          return (
            <CustomIconButton
              size="small"
              onClick={() => handleDelete(row.row.id)}
            >
              <DeleteIcon />
            </CustomIconButton>
          );
        } else {
          return <div></div>;
        }
      },
    },
  ];

  const classes = useStyles();
  const [columns, setColumns] = useState(COLUMNS);

  useEffect(() => {
    if (hideDetails) {
      setColumns(COLUMNS.filter((column) => column.accessor !== 'detail'));
    } else {
      setColumns(COLUMNS);
    }
  }, [hideDetails]);

  return (
    <CustomTable
      columns={columns}
      data={rows}
      hoverProperty={hoverProperty}
      pre
      bordered
    />
  );
}

export default LedgerDetail;
