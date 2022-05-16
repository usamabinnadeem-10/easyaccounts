export const formatForm = (form) => ({
  ...form,
  data: form.data.map((d) => ({
    lot_number: d.lot_number.value,
    detail: d.detail.map((det) => ({
      ...det,
      formula: det.formula.value,
      warehouse: det.warehouse.value,
      to_warehouse: det.to_warehouse.value,
    })),
  })),
});
