export const formatTransferDetail = (data, warehouses, products) => {
  let final = data.map((row) => ({
    id: row.id,
    quantity: row.quantity,
    yards_per_piece: row.yards_per_piece,
    product: products[row.product].label,
    from_warehouse: warehouses[row.from_warehouse].label,
    to_warehouse: warehouses[row.to_warehouse].label,
  }));
  final.push({
    id: 1,
    product: 'Total',
    quantity: data.reduce((prev, curr) => prev + curr.quantity, 0),
  });
  return final;
};
