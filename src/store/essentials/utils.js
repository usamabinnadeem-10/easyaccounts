export const formatPersonLabels = (persons) => {
  return persons.map((p) => ({
    ...p,
    label: `${p.label}${p.address ? ` (${p.address})` : ''}`,
  }));
};
