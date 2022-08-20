import { FIELDS } from '../../containers/CustomFilters/constants';

export const getFilters = (essentials) => {
  return [
    {
      qp: 'product',
      options: essentials.products,
      type: FIELDS.SELECT,
      placeholder: 'Product',
    },
    {
      qp: 'category',
      options: essentials.productCategories,
      type: FIELDS.SELECT,
      placeholder: 'Product Category',
    },
    {
      qp: 'person',
      options: [...essentials.customers, essentials.suppliers],
      type: FIELDS.SELECT,
      placeholder: 'Customer',
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
  ];
};

export const getTableData = (data) => {
  let rows = data.map((data, index) => ({ ...data, id: index }));
  let total_rows = rows.length;
  let totals = {
    id: total_rows,
    product__name: 'Total',
    quantity_sold: rows.reduce((prev, curr) => prev + curr.quantity_sold, 0),
    number_of_times_sold: rows.reduce(
      (prev, curr) => prev + curr.number_of_times_sold,
      0
    ),
  };
  let averages = {
    id: total_rows + 1,
    product__name: 'Average Rates',
    quantity_sold:
      rows.reduce((prev, curr) => prev + curr.quantity_sold, 0) /
      parseFloat(total_rows),
    average_rate:
      rows.reduce((prev, curr) => prev + curr.average_rate, 0) /
      parseFloat(total_rows),
    minimum_rate:
      rows.reduce((prev, curr) => prev + curr.minimum_rate, 0) /
      parseFloat(total_rows),
    maximum_rate:
      rows.reduce((prev, curr) => prev + curr.maximum_rate, 0) /
      parseFloat(total_rows),
  };
  rows.push(totals);
  rows.push(averages);
  return rows;
};
