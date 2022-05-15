export const getFields = (essentials, formulas, isTransfer) => {
  let fields = [
    {
      field: 'quantity',
      type: 'number',
      label: 'Quantity',
    },
    {
      field: 'actual_gazaana',
      type: 'number',
      label: 'Actual',
    },
    {
      field: 'expected_gazaana',
      type: 'number',
      label: 'Expected',
    },
    {
      field: 'formula',
      type: 'select',
      label: 'Formula',
      options: formulas,
    },
    {
      field: 'warehouse',
      type: 'select',
      label: 'Warehouse',
      options: essentials.warehouses,
    },
  ];
  if (isTransfer) {
    fields.push({
      field: 'to_warehouse',
      type: 'select',
      label: 'Transfer to',
      options: essentials.warehouses,
    });
  } else {
    fields.push({
      field: 'rate',
      type: 'number',
      label: 'Rate',
    });
  }
  return fields;
};

export const formatLotNumbers = (lotNumbers) =>
  lotNumbers.map((number) => ({ value: number.id, label: number.lot_number }));
