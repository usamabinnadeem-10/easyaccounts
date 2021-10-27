export const findPerson = (personID, suppliers, customers) => {
  let supplier = suppliers.filter((supplier) => supplier.value === personID);
  let customer = customers.filter((customer) => customer.value === personID);

  return supplier.length ? supplier[0] : customer.length ? customer[0] : null;
};

export const findAccountType = (accountID, accountTypes) => {
  return accountTypes.filter((type) => type.value === accountID)[0];
};
