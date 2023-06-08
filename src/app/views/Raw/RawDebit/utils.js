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

export const formatTransactionForEditing = (transaction, essentials) => {
  const { suppliers, warehouses } = essentials;
  return {
    ...transaction,
    person: suppliers.find((s) => s.value === transaction.person),
    data: transaction.rawdebitlot_set.map((lot) => {
      return {
        ...lot,
        lot_number: {
          value: lot.lot_number,
          label: lot.lot_number,
          lotId: lot.id,
        },
        detail: lot.rawdebitlotdetail_set.map((detail) => {
          return {
            ...detail,
            warehouse: warehouses.find((w) => w.value === detail.warehouse),
          };
        }),
      };
    }),
  };
};
