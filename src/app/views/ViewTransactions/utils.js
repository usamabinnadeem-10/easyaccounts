import { getReadableDate } from '../../utilities/stringUtils';
import { v4 } from 'uuid';

export const formatTransactionData = (data, persons) => {
  let transactions = [];
  let grandTotal = 0;
  let totalDiscount = 0;
  data.forEach((element, idx) => {
    let total = 0.0;
    element.transaction_detail.forEach((detail) => {
      total += detail.rate * detail.quantity * detail.yards_per_piece;
    });
    totalDiscount += element.discount;
    grandTotal += total;
    transactions.push({
      ...element,
      index: idx + 1,
      person: persons?.[element.person]?.label,
      serial: `${element.serial_type}-${element.serial}`,
      manual_serial: `${element.manual_serial}`,
      total: total - element.discount,
      hasClick: true,
    });
  });
  transactions.length > 0 &&
    transactions.push({
      id: v4(),
      serial: 'TOTAL',
      manual_invoice_serial: `${transactions.length}`,
      total: grandTotal - totalDiscount,
      hasClick: false,
      // discount: totalDiscount,
    });
  return transactions;
};

export const formatTransactionDetails = (details, products, warehouses) => {
  let transactions = [];
  details.forEach((element) => {
    let product = products[element.product];
    let warehouse = warehouses[element.warehouse];
    transactions.push({
      product: product,
      warehouse: warehouse,
      quantity: element.quantity,
      yards_per_piece: {
        value: element.yards_per_piece,
        label: element.yards_per_piece,
      },
      rate: element.rate,
      total: element.rate * element.quantity * element.yards_per_piece,
      id: element.id,
    });
  });
  return transactions;
};
