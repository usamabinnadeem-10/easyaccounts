export const formatData = (data, products, warehouses) => {
  return data.map((d, idx) => ({
    ...d,
    id: idx + 1,
    product: products?.[d.product]?.label,
    warehouse: warehouses?.[d.warehouse]?.label || '---',
    yards_per_piece: d?.yards_per_piece || '---',
    quantity: d?.quantity || 0,
  }));
};
