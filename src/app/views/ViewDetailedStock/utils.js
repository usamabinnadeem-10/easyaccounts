import { getReadableDate, formatCurrency } from '../../utilities/stringUtils';

export const formatDetailedStock = (
  data,
  persons,
  warehouses,
  currentWarehouse
) => {
  let stock = [];
  let balance = data.opening_stock;
  let totalCR = 0.0;
  let totalDB = 0.0;
  data.data.forEach((value, idx) => {
    let currentNature = value.transaction__nature;
    if (currentNature === 'C') {
      balance += value.quantity;
      totalCR += value.quantity;
    } else {
      balance -= value.quantity;
      totalDB += value.quantity;
    }
    stock.push({
      id: `${value.transaction_id}-${idx}`,
      stock: balance,
      serial: `${value.transaction__serial_type}-${value.transaction__serial}`,
      manual_serial: `${value.transaction__manual_serial || '---'}`,
      date: getReadableDate(value.transaction__date),
      credit: currentNature === 'C' ? value.quantity : null,
      debit: currentNature === 'D' ? value.quantity : null,
      person: persons?.[value.transaction__person].label,
      warehouse: warehouses?.[value.warehouse].label,
      gazaana: value.yards_per_piece,
      gazaanaBalance: formatCurrency(balance * value.yards_per_piece),
      transactionType: value.transaction__type,
    });
  });

  // filter the transfers where from or to is currentWarehouse
  if (currentWarehouse?.value) {
    data.transfers.forEach((transfer, index) => {
      let data = {
        id: `${transfer.id}`,
        date: getReadableDate(transfer.date),
        gazaana: transfer.yards_per_piece,
        serial: 'TR',
        bookSerial: 'TR',
        transactionType: 'transfer',
      };
      if (currentWarehouse.value === transfer.to_warehouse_id) {
        balance += transfer.quantity;
        totalCR += transfer.quantity;
        stock.push({
          ...data,
          credit: transfer.quantity,
          stock: balance,
          gazaanaBalance: formatCurrency(balance * transfer.yards_per_piece),
          warehouse: warehouses?.[transfer.to_warehouse_id].label,
        });
      } else if (currentWarehouse.value === transfer.from_warehouse_id) {
        balance -= transfer.quantity;
        totalDB += transfer.quantity;
        stock.push({
          ...data,
          debit: transfer.quantity,
          stock: balance,
          gazaanaBalance: formatCurrency(balance * transfer.yards_per_piece),
          warehouse: warehouses?.[transfer.from_warehouse_id].label,
        });
      }
    });
  } else {
    data.transfers.forEach((transfer, index) => {
      totalCR += transfer.quantity;
      totalDB += transfer.quantity;
      balance -= transfer.quantity;
      let data = {
        date: getReadableDate(transfer.date),
        gazaana: transfer.yards_per_piece,
        serial: 'TR',
        bookSerial: 'TR',
        transactionType: 'transfer',
      };
      stock.push({
        ...data,
        id: `${transfer.id}0`,
        debit: transfer.quantity,
        warehouse: warehouses?.[transfer.transfer__from_warehouse].label,
        stock: balance,
        gazaanaBalance: formatCurrency(balance * transfer.yards_per_piece),
      });
      balance += transfer.quantity;
      stock.push({
        ...data,
        id: `${transfer.id}1`,
        credit: transfer.quantity,
        warehouse: warehouses?.[transfer.to_warehouse].label,
        stock: balance,
        gazaanaBalance: formatCurrency(balance * transfer.yards_per_piece),
      });
    });
  }
  stock.length > 0 &&
    stock.push({
      id: `${stock.length + 1}`,
      date: 'TOTAL',
      credit: totalCR,
      debit: totalDB,
      stock: formatCurrency(balance),
      gazaanaBalance: stock[stock.length - 1].gazaanaBalance,
      rowVariant: 'h6',
      rowFontWeight: '900',
    });
  return stock;
};
