export const formatTransactionData = (transactions, essentials) => {
  const { warehouses, rawProducts } = essentials;
  return transactions.map((data) => ({
    ...data,
    numLots: data.rawtransferlot_set.length,
    numThaans: data.rawtransferlot_set.reduce(
      (prev, curr) =>
        prev +
        curr.rawtransferlotdetail_set.reduce(
          (prev2, curr2) => prev2 + curr2.quantity,
          0,
        ),
      0,
    ),
    lotData: data.rawtransferlot_set.map((lot) => ({
      ...lot,
      raw_product: rawProducts.find((p) => p.id === lot.raw_product),
      lotDetail: lot.rawtransferlotdetail_set.map((detail) => ({
        ...detail,
        warehouse: warehouses.find((w) => w.value === detail.warehouse),
      })),
    })),
  }));
};
