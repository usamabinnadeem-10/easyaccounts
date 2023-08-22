import {
  formatCurrency,
  convertCurrencyToNumber,
} from '../../utilities/stringUtils';

import { FIELDS } from '../../containers/CustomFilters/constants';
import { getColumns } from './constants';

export const formatStockData = (data, props) => {
  let newStockData = data.map((stockData, index) => {
    return {
      ...stockData,
      id: index + 1,
      product: props.products?.[stockData.product]?.label,
      warehouse: props.warehouses?.[stockData.warehouse]?.label,
      // quantity: formatCurrency(stockData.quantity, 'decimal', 3),
      quantity: stockData.quantity,
      // total_gazaana: formatCurrency(
      //   stockData.quantity * stockData.yards_per_piece,
      //   'decimal',
      //   3
      // ),
      total_gazaana: stockData.quantity * stockData.yards_per_piece,
    };
  });
  const collator = new Intl.Collator('en', {
    numeric: true,
    sensitivity: 'base',
  });
  let sorted = newStockData.sort((a, b) =>
    collator.compare(a.product, b.product),
  );
  sorted = sorted.sort((a, b) =>
    collator.compare(a.yards_per_piece, b.yards_per_piece),
  );
  sorted = sorted.sort((a, b) => collator.compare(a.warehouse, b.warehouse));

  // sorted.push({
  //   id: data.length + 2,
  //   product: 'TOTAL',
  //   quantity: formatCurrency(
  //     sorted.reduce(
  //       (acc, stockData) => acc + convertCurrencyToNumber(stockData.quantity),
  //       0
  //     ),
  //     'decimal',
  //     3
  //   ),
  //   total_gazaana: formatCurrency(
  //     sorted.reduce(
  //       (acc, stockData) =>
  //         acc + convertCurrencyToNumber(stockData.total_gazaana),
  //       0
  //     ),
  //     'decimal',
  //     3
  //   ),
  // });

  return sorted;
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
    {
      qp: 'date',
      type: FIELDS.DATE,
      placeholder: 'Date (less than)',
      variant: 'end',
    },
    {
      qp: 'outcut',
      options: OUTCUT,
      type: FIELDS.SELECT,
      placeholder: 'Outcut',
    },
    {
      qp: 'quantity',
      type: FIELDS.NUMBER,
      placeholder: 'Stock Qty',
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

export const groupStock = ({ groupKeys, stock, ...props }) => {
  const columns = getColumns().filter((col) =>
    groupKeys.some((key) => col !== key),
  );
  const depth = groupKeys.length;
  const data = {};
};
