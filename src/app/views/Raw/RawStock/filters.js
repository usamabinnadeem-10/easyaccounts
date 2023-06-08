import { FIELDS } from '../../../containers/CustomFilters/constants';

export const getFilters = (essentials) => {
  return [
    {
      qp: 'lot_number',
      type: FIELDS.NUMBER,
      placeholder: 'Lot #',
    },
    {
      qp: 'raw_product',
      options: essentials.rawProducts.map((p) => ({
        value: p.id,
        label: p.name,
      })),
      type: FIELDS.SELECT,
      placeholder: 'Product',
    },
    {
      qp: 'warehouse',
      options: [...essentials.warehouses],
      type: FIELDS.SELECT,
      placeholder: 'Warehouse',
    },
    {
      qp: 'quantity__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Quantity # (from)',
    },
    {
      qp: 'quantity__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Quantity # (to)',
    },
    {
      qp: 'actual_gazaana__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Gazaana # (from)',
    },
    {
      qp: 'actual_gazaana__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Gazaana # (to)',
    },
    {
      qp: 'expected_gazaana__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Physical Gazaana # (from)',
    },
    {
      qp: 'expected_gazaana__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Physical Gazaana # (to)',
    },
  ];
};
