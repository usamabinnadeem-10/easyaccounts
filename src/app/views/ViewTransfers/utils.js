import CustomIconButton from '../../components/CustomIconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { getReadableDate } from '../../utilities/stringUtils';

export const getColumns = (
  handleClick,
  handleEdit,
  handleDelete,
  warehouses,
) => {
  return [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: (row) => (
        <div onClick={row.row.id ? () => handleClick(row.row.id) : null}>
          {row.value ? getReadableDate(row.value) : ''}
        </div>
      ),
    },
    {
      accessorKey: 'serial',
      header: 'Serial #',
      cell: (row) => (
        <div onClick={row.row.id ? () => handleClick(row.row.id) : null}>
          {row.value}
        </div>
      ),
    },
    {
      accessorKey: 'manual_serial',
      header: 'Book #',
      cell: (row) => (
        <div onClick={row.row.id ? () => handleClick(row.row.id) : null}>
          {row.value}
        </div>
      ),
    },
    {
      accessorKey: 'from_warehouse',
      header: 'From',
      cell: (row) => (
        <div onClick={row.row.id ? () => handleClick(row.row.id) : null}>
          {warehouses?.[row.value]?.label || '---'}
        </div>
      ),
    },
    {
      accessorKey: 'total',
      header: 'Thaan transferred #',
      cell: (row) => (
        <div
          onClick={
            row.row.id && !row.row.original.dummy
              ? () => handleClick(row.row.id)
              : null
          }
        >
          {row.value}
        </div>
      ),
    },
    {
      accessorKey: 'edit',
      header: 'Edit',
      cell: (row) => {
        if (!row.row.original.dummy) {
          return (
            <CustomIconButton
              onClick={row.row.id ? () => handleEdit(row.row.id) : null}
            >
              <EditIcon />
            </CustomIconButton>
          );
        }
        return <></>;
      },
    },
    {
      accessorKey: 'delete',
      header: 'Delete',
      cell: (row) => {
        if (!row.row.original.dummy) {
          return (
            <CustomIconButton
              onClick={row.row.id ? () => handleDelete(row.row.id) : null}
            >
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
