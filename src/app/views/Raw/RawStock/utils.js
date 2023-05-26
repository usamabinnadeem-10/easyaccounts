export const formatStockData = (stock, essentials) => {
  const { warehouses, rawProducts } = essentials;
  return stock.map((data) => ({
    ...data,
    id: Math.random(),
    warehouse: warehouses.find((w) => w.value === data.warehouse),
    raw_product: rawProducts.find((r) => r.id === data.raw_product),
  }));
};
