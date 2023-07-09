import { formatCurrency } from '../../utilities/stringUtils';

export const getTotalSale = (transactions) => {
  let onlySales = transactions.filter((t) => t.serial_type === 'INV');
  let sale = onlySales.reduce(
    (prev, curr) =>
      prev +
      curr.transaction_detail.reduce(
        (p, c) => p + c.rate * c.yards_per_piece * c.quantity,
        0,
      ),
    0,
  );
  let discount = onlySales.reduce((prev, curr) => prev + curr.discount, 0);
  return formatCurrency(sale - discount, 'currency', 0);
};
