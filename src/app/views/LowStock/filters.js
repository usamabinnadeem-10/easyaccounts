import { FIELDS } from '../../containers/CustomFilters/constants';

export const getFilters = (essentials) => {
  return [
    {
      qp: 'category',
      type: FIELDS.SELECT,
      options: essentials.productCategories,
      placeholder: 'Category',
    },
    {
      qp: 'warehouse',
      type: FIELDS.SELECT,
      options: essentials.warehouses,
      placeholder: 'Warehouse',
    },
    {
      qp: 'treshold',
      type: FIELDS.NUMBER,
      placeholder: 'Quantity (less than)',
    },
  ];
};
