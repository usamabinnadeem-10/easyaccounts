export const formatTransactionData = (transactions, essentials) => {
  const { warehouses, rawProducts, customers, suppliers } = essentials;
  return transactions.map((data) => ({
    ...data,
    person: [...customers, ...suppliers].find((p) => p.value === data.person),
    numLots: data.rawdebitlot_set.length,
    numThaans: data.rawdebitlot_set.reduce(
      (prev, curr) =>
        prev +
        curr.rawdebitlotdetail_set.reduce(
          (prev2, curr2) => prev2 + curr2.quantity,
          0,
        ),
      0,
    ),
    lotData: data.rawdebitlot_set.map((lot) => ({
      ...lot,
      raw_product: rawProducts.find((p) => p.id === lot.raw_product),
      lotDetail: lot.rawdebitlotdetail_set.map((detail) => ({
        ...detail,
        warehouse: warehouses.find((w) => w.value === detail.warehouse),
      })),
    })),
  }));
};
