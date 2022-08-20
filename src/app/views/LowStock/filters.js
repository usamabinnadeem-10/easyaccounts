import { FIELDS } from '../../containers/CustomFilters/constants';

const IGNORE = [
  {
    value: 'true',
    label: 'Yes',
  },
];

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
      qp: 'ignoreGazaana',
      type: FIELDS.SELECT,
      options: IGNORE,
      placeholder: 'Ignore Gazaana',
    },
    {
      qp: 'treshold',
      type: FIELDS.NUMBER,
      placeholder: 'Quantity (less than)',
    },
  ];
};
