export const formatForm = (form) => ({
  ...form,
  person: form.person.value,
  data: form.data.map((d) => ({
    lot_number: d.lot_number.value,
    detail: d.detail.map((det) => ({
      ...det,
      // formula: det.formula.value,
      warehouse: det.warehouse.value,
    })),
  })),
});

export const formatTransactionForEditing = (transaction, hashes) => {
  const { persons, warehouses, rawProducts } = hashes;
  return {
    ...transaction,
    person: persons?.[transaction.person],
    data: transaction.lots.map((lot) => {
      return {
        ...lot,
        lot_number: {
          value: lot.lot_number,
          label: `${lot.lot_number} - ${rawProducts?.[lot.raw_product].label}`,
          lotId: lot.id,
        },
        detail: lot.lot_detail.map((detail) => {
          return {
            ...detail,
            warehouse: warehouses?.[detail.warehouse],
          };
        }),
      };
    }),
  };
};
