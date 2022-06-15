import {
  formatCurrency,
  convertCurrencyToNumber,
} from '../../utilities/stringUtils';

import { FIELDS } from '../../containers/CustomFilters/constants';

export const formatStockData = (data, props) => {
  let newStockData = data.map((stockData, index) => {
    return {
      ...stockData,
      id: index + 1,
      product: props.products[stockData.product].label,
      warehouse: props.warehouses[stockData.warehouse].label,
      quantity: formatCurrency(stockData.quantity),
      total_gazaana: formatCurrency(
        stockData.quantity * stockData.yards_per_piece
      ),
    };
  });
  newStockData.push({
    id: data.length + 2,
    product: 'TOTAL',
    quantity: formatCurrency(
      newStockData.reduce(
        (acc, stockData) => acc + convertCurrencyToNumber(stockData.quantity),
        0
      )
    ),
    total_gazaana: formatCurrency(
      newStockData.reduce(
        (acc, stockData) =>
          acc + convertCurrencyToNumber(stockData.total_gazaana),
        0
      )
    ),
  });
  return newStockData;
};

const OUTCUT = [
  {
    label: 'Only Outcut',
    value: 'True',
  },
];

export const getFilters = (essentials) => {
  return [
    {
      qp: 'product',
      options: essentials.products,
      type: FIELDS.SELECT,
      placeholder: 'Product',
    },
    {
      qp: 'product__category',
      options: essentials.productCategories,
      type: FIELDS.SELECT,
      placeholder: 'Category',
    },
    {
      qp: 'warehouse',
      options: essentials.warehouses,
      type: FIELDS.SELECT,
      placeholder: 'Warehouse',
    },
    // {
    //   qp: 'date',
    //   type: FIELDS.DATE,
    //   placeholder: 'Date (less than)',
    // },
    {
      qp: 'outcut',
      options: OUTCUT,
      type: FIELDS.SELECT,
      placeholder: 'Outcut',
    },
    {
      qp: 'quantity__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Stock Qty (more than)',
    },
    {
      qp: 'quantity__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Stock Qty (less than)',
    },
    {
      qp: 'yards_per_piece__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Gazaana (more than)',
    },
    {
      qp: 'yards_per_piece__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Gazaana (less than)',
    },
    {
      qp: 'yards_per_piece',
      type: FIELDS.NUMBER,
      placeholder: 'Gazaana (equal to)',
    },
  ];
};
