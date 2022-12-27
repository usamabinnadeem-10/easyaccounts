import { FIELDS } from '../../containers/CustomFilters/constants';

export const getFilters = (essentials) => {
  return [
    {
      qp: 'product',
      type: FIELDS.SELECT,
      placeholder: 'Product',
      options: essentials.products,
    },
    {
      qp: 'product_category',
      type: FIELDS.SELECT,
      placeholder: 'Product Category',
      options: essentials.productCategories,
    },
    {
      qp: 'warehouse',
      type: FIELDS.SELECT,
      placeholder: 'Warehouse',
      options: essentials.warehouses,
    },
    {
      qp: 'yards_per_piece',
      type: FIELDS.TEXT,
      placeholder: 'Gazaana',
    },
    {
      qp: 'start',
      type: FIELDS.DATE,
      placeholder: 'Start Date',
      variant: 'start',
    },
    {
      qp: 'end',
      type: FIELDS.DATE,
      placeholder: 'End Date',
      variant: 'end',
    },
    {
      qp: 'remove_transfers',
      type: FIELDS.SELECT,
      placeholder: 'Ignore transfers?',
      options: [
        {
          label: 'Yes',
          value: 'yes',
        },
      ],
    },
  ];
};
