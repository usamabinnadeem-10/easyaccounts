import { FIELDS } from './constants';

export const getRowFields = (essentials) => {
  return [
    {
      name: FIELDS.PRODUCT,
      options: essentials.products,
      label: 'Product',
      xs: 4,
    },
    {
      name: FIELDS.GAZAANA,
      component: 'text',
      label: 'Gazaana',
      xs: 1,
    },
    {
      name: FIELDS.TO_WAREHOUSE,
      options: essentials.warehouses,
      label: 'To warehouse',
      xs: 3,
    },
    {
      name: FIELDS.QUANTITY,
      component: 'text',
      label: 'Thaan',
      xs: 1,
    },
  ];
};
