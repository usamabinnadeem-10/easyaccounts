import { FIELDS } from './constants';

export const getRowFields = (essentials) => {
  return [
    {
      name: FIELDS.PRODUCT,
      options: essentials.products,
      label: 'Product',
      xs: 3,
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
      xs: 2,
    },
    {
      name: FIELDS.QUANTITY,
      component: 'text',
      label: 'Thaan',
      xs: 1,
    },
  ];
};
