export const formatData = (data, products, warehouses) => {
  let unsorted = data.map((d, idx) => ({
    ...d,
    id: idx + 1,
    product: products?.[d]?.label,
  }));
  const collator = new Intl.Collator('en', {
    numeric: true,
    sensitivity: 'base',
  });
  let sorted = unsorted.sort((a, b) => collator.compare(a.product, b.product));
  return sorted;
};
