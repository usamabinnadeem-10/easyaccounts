export const findPerson = (personID, suppliers, customers) => {
  let supplier = suppliers.filter((supplier) => supplier.value === personID);
  let customer = customers.filter((customer) => customer.value === personID);

  return supplier.length ? supplier[0] : customer.length ? customer[0] : null;
};

export const findAccountType = (accountID, accountTypes) => {
  return accountTypes.filter((type) => type.value === accountID)[0];
};

export const findProductHead = (headID, productHeads) => {
  return productHeads.filter((head) => head.value === headID)[0];
};

export const findProductColor = (colorID, colors) => {
  return colors.filter((color) => color.value === colorID)[0];
};

export const findWarehouse = (warehouseID, warehouses) => {
  return warehouses.filter((warehouse) => warehouse.value === warehouseID)[0];
};

export const findProduct = (
  productID,
  products,
  productHeads,
  flat = false
) => {
  let product = {};
  for (const key in products) {
    let current = products[key].filter(
      (product) => product.value === productID
    );
    if (current.length) {
      product = current[0];
      break;
    }
  }
  if (flat) {
    return product;
  }
  product.product = findProductHead(product.product_head, productHeads);
  return {
    product: findProductHead(product.product_head, productHeads),
    color: product,
  };
};

export const findExpenseAccount = (expenseAccountID, expenseAccounts) => {
  return expenseAccounts.filter(
    (expense) => expense.value === expenseAccountID
  )[0];
};
