import { getReadableDate, formatCurrency } from '../../utilities/stringUtils';

export const formatDetailedStock = (data, persons, warehouses) => {
  let stock = [];
  let balance = data.opening_stock;
  let totalCR = 0.0;
  let totalDB = 0.0;
  data.data.forEach((value, idx) => {
    let currentNature = value.transaction__nature;
    if (currentNature) {
      if (currentNature === 'C') {
        balance += value.quantity;
        totalCR += value.quantity;
      } else if (currentNature === 'D') {
        balance -= value.quantity;
        totalDB += value.quantity;
      }
      stock.push({
        id: `${value.transaction_id}-${idx}`,
        stock: balance,
        serial: `${value.transaction__serial_type}-${value.transaction__serial}`,
        manual_serial: `${value.transaction__manual_serial || '---'}`,
        date: getReadableDate(value.date),
        credit: currentNature === 'C' ? value.quantity : null,
        debit: currentNature === 'D' ? value.quantity : null,
        person: persons?.[value.transaction__person].label,
        warehouse: warehouses?.[value.warehouse].label,
        gazaana: value.yards_per_piece,
        gazaanaBalance: formatCurrency(balance * value.yards_per_piece),
        transactionType: value.transaction__type,
      });
    } else {
      totalCR += value.quantity;
      totalDB += value.quantity;
      balance -= value.quantity;
      let data = {
        date: getReadableDate(value.date),
        gazaana: value.yards_per_piece,
        serial: `T-${value.transfer__serial}`,
        manual_serial: `${value.transfer__manual_serial}`,
        transactionType: 'transfer',
      };
      stock.push({
        ...data,
        id: `${value.id}0`,
        debit: value.quantity,
        warehouse: warehouses?.[value.transfer__from_warehouse].label,
        stock: balance,
        gazaanaBalance: formatCurrency(balance * value.yards_per_piece),
      });
      balance += value.quantity;
      stock.push({
        ...data,
        serial: null,
        manual_serial: null,
        transactionType: null,
        id: `${value.id}1`,
        credit: value.quantity,
        warehouse: warehouses?.[value.to_warehouse].label,
        stock: balance,
        gazaanaBalance: formatCurrency(balance * value.yards_per_piece),
      });
    }
  });

  stock.length > 0 &&
    stock.push({
      id: `${stock.length + 1}`,
      date: 'TOTAL',
      credit: totalCR,
      debit: totalDB,
      stock: formatCurrency(balance),
      gazaanaBalance: stock[stock.length - 1].gazaanaBalance,
      // rowVariant: 'h6',
      // rowFontWeight: '900',
    });
  return stock;
};
