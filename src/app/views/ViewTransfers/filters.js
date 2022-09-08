import { FIELDS } from '../../containers/CustomFilters/constants';

export const getFilters = (essentials) => {
  return [
    {
      qp: 'from_warehouse',
      type: FIELDS.SELECT,
      options: essentials.warehouses,
      placeholder: 'From Warehouse',
    },
    {
      qp: 'transfer_detail__product',
      type: FIELDS.SELECT,
      options: essentials.products,
      placeholder: 'Product',
    },
    {
      qp: 'transfer_detail__product__category',
      type: FIELDS.SELECT,
      options: essentials.productCategories,
      placeholder: 'Product category',
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
