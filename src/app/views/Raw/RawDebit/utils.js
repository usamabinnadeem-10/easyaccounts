export const formatForm = (form) => ({
  ...form,
  person: form.person.value,
  data: form.data.map((d) => ({
    lot_number: d.lot_number.value,
    detail: d.detail.map((det) => ({
      ...det,
      formula: det.formula.value,
      warehouse: det.warehouse.value,
    })),
  })),
});
