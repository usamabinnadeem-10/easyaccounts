import { FIELDS } from '../../containers/CustomFilters/constants';

export const getFilters = (essentials) => {
  return [
    {
      qp: 'transaction_detail__product',
      type: FIELDS.SELECT,
      options: essentials.products,
      placeholder: 'Product',
    },
    {
      qp: 'transaction_detail__from_warehouse',
      type: FIELDS.SELECT,
      options: essentials.warehouses,
      placeholder: 'From Warehouse',
    },
    {
      qp: 'transaction_detail__to_warehouse',
      type: FIELDS.SELECT,
      options: essentials.warehouses,
      placeholder: 'To Warehouse',
    },
    {
      qp: 'date__gte',
      type: FIELDS.DATE,
      placeholder: 'Start Date',
    },
    {
      qp: 'date__lte',
      type: FIELDS.DATE,
      placeholder: 'End Date',
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
