import { PRODUCT_GLUES, PRODUCT_TYPES } from '../common/constants';

export const formatStockData = (stock, essentials) => {
  const { warehouses, rawProducts } = essentials;
  return stock.map((data) => ({
    ...data,
    id: Math.random(),
    warehouse: warehouses.find((w) => w.value === data.warehouse),
    raw_product: rawProducts.find((r) => r.value === data.raw_product),
    product_glue: PRODUCT_GLUES.find((r) => r.value === data.product_glue),
    product_type: PRODUCT_TYPES.find((r) => r.value === data.product_type),
  }));
};
