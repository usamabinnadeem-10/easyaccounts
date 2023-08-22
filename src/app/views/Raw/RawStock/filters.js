import { FIELDS } from '../../../containers/CustomFilters/constants';
import { PRODUCT_GLUES, PRODUCT_TYPES } from '../common/constants';

export const getFilters = (essentials) => {
  return [
    {
      qp: 'lot_number',
      type: FIELDS.NUMBER,
      placeholder: 'Lot #',
    },
    {
      qp: 'raw_product',
      options: essentials.rawProducts,
      type: FIELDS.SELECT,
      placeholder: 'Product',
    },
    {
      qp: 'product_glue',
      options: PRODUCT_GLUES,
      type: FIELDS.SELECT,
      placeholder: 'Product Glue',
    },
    {
      qp: 'product_type',
      options: PRODUCT_TYPES,
      type: FIELDS.SELECT,
      placeholder: 'Product Type',
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
