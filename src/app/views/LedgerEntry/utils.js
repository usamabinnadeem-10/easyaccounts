import { ROLES } from '../../../constants/roles';

export const getPersonOptions = (essentials, role) => {
  if (!essentials || !role) {
    return [];
  }
  if (role === ROLES.ADMIN) {
    return [
      ...essentials.customers,
      ...essentials.suppliers,
      ...essentials.equities,
      ...essentials.advanceExpenses,
    ];
  }
  return essentials.customers;
};

export const formatDataBeforePosting = (data) => ({
  ledger_entry: {
    ...data,
    nature: data.nature.value,
    person: data.person.value,
    account_type: data?.account_type?.value || null,
  },
  detail: data.detail,
});
