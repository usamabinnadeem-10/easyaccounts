export const formatData = (data, products, warehouses) => {
  let unsorted = data.map((d, idx) => ({
    ...d,
    id: idx + 1,
    product: products?.[d.product]?.label,
    yards_per_piece: d?.yards_per_piece || '---',
    warehouse: warehouses?.[d.warehouse]?.label || '---',
    quantity: d?.quantity || '0',
  }));
  const collator = new Intl.Collator('en', {
    numeric: true,
    sensitivity: 'base',
  });
  let sorted = unsorted.sort((a, b) => collator.compare(a.product, b.product));
  return sorted;
};
