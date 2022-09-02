import { FIELDS } from '../../containers/CustomFilters/constants';

import CustomIconButton from '../../components/CustomIconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { getReadableDate } from '../../utilities/stringUtils';

export const getFilters = (essentials) => {
  return [
    {
      qp: 'transfer_detail__product',
      type: FIELDS.SELECT,
      options: essentials.products,
      placeholder: 'Product',
    },
    {
      qp: 'from_warehouse',
      type: FIELDS.SELECT,
      options: essentials.warehouses,
      placeholder: 'From Warehouse',
    },
    {
      qp: 'serial',
      type: FIELDS.NUMBER,
      placeholder: 'Serial (equal to)',
    },
    {
      qp: 'serial__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Serial (more than)',
    },
    {
      qp: 'serial__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Serial (less than)',
    },
    {
      qp: 'manual_serial',
      type: FIELDS.NUMBER,
      placeholder: 'Book # (equal to)',
    },
    {
      qp: 'manual_serial__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Book # (more than)',
    },
    {
      qp: 'manual_serial__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Book # (less than)',
    },
    {
      qp: 'transfer_detail__to_warehouse',
      type: FIELDS.SELECT,
      options: essentials.warehouses,
      placeholder: 'To Warehouse',
    },
    {
      qp: 'date__gte',
      type: FIELDS.DATE,
      placeholder: 'Start Date',
      variant: 'start',
    },
    {
      qp: 'date__lte',
      type: FIELDS.DATE,
      placeholder: 'End Date',
      variant: 'end',
    },
    {
      qp: 'transfer_detail__quantity__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Quantity (more than)',
    },
    {
      qp: 'transfer_detail__quantity__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Quantity (less than)',
    },
    {
      qp: 'transfer_detail__yards_per_piece',
      type: FIELDS.NUMBER,
      placeholder: 'Gazaana (equal to)',
    },
    {
      qp: 'transfer_detail__yards_per_piece__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Gazaana (more than)',
    },
    {
      qp: 'transfer_detail__yards_per_piece__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Gazaana (less than)',
    },
  ];
};

export const getColumns = (
  handleClick,
  handleEdit,
  handleDelete,
  warehouses
) => {
  return [
    {
      accessor: 'date',
      Header: 'Date',
      Cell: (row) => (
        <div onClick={row.row.id ? () => handleClick(row.row.id) : null}>
          {row.value ? getReadableDate(row.value) : ''}
        </div>
      ),
    },
    {
      accessor: 'serial',
      Header: 'Serial #',
      Cell: (row) => (
        <div onClick={row.row.id ? () => handleClick(row.row.id) : null}>
          {row.value}
        </div>
      ),
    },
    {
      accessor: 'manual_serial',
      Header: 'Book #',
      Cell: (row) => (
        <div onClick={row.row.id ? () => handleClick(row.row.id) : null}>
          {row.value}
        </div>
      ),
    },
    {
      accessor: 'from_warehouse',
      Header: 'From',
      Cell: (row) => (
        <div onClick={row.row.id ? () => handleClick(row.row.id) : null}>
          {warehouses?.[row.value]?.label || '---'}
        </div>
      ),
    },
    {
      accessor: 'total',
      Header: 'Thaan transferred #',
      Cell: (row) => (
        <div
          onClick={
            row.row.id && !row.row.original.dummy
              ? () => handleClick(row.row.id)
              : null
          }>
          {row.value}
        </div>
      ),
    },
    {
      accessor: 'edit',
      Header: 'Edit',
      Cell: (row) => {
        if (!row.row.original.dummy) {
          return (
            <CustomIconButton
              onClick={row.row.id ? () => handleEdit(row.row.id) : null}>
              <EditIcon />
            </CustomIconButton>
          );
        }
        return <></>;
      },
    },
    {
      accessor: 'delete',
      Header: 'Delete',
      Cell: (row) => {
        if (!row.row.original.dummy) {
          return (
            <CustomIconButton
              onClick={row.row.id ? () => handleDelete(row.row.id) : null}>
              <DeleteIcon />
            </CustomIconButton>
          );
        }
        return <></>;
      },
    },
  ];
};

export const formatTransferData = (data) => {
  let _data = data.map((val) => ({
    ...val,
    // date: getReadableDate(val.date),
    // from_warehouse: warehouses[val.from_warehouse].label,
    total: val.transfer_detail.reduce((prev, curr) => prev + curr.quantity, 0),
  }));
  _data.push({
    id: 1,
    dummy: true,
    total: _data.reduce((prev, curr) => prev + curr.total, 0),
  });
  return _data;
};
