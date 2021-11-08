import { DB } from "../../constants/db";

import {
  findPerson,
  findWarehouse,
  findProduct,
  findAccountType,
} from "../../app/views/LedgerTransaction/utils";

export const isTransactionAvailable = (transactions, transactionID) => {
  let found = transactions.filter((element) => element.id === transactionID);
  if (found.length) {
    return true;
  } else {
    return false;
  }
};

const formatTransactionDetail = (
  details,
  products,
  productHeads,
  warehouses
) => {
  let formatted = [];
  details.forEach((element) => {
    let product = findProduct(
      element[DB.PRODUCT],
      products,
      productHeads,
      true
    );
    formatted.push({
      ...element,
      [DB.WAREHOUSE]: findWarehouse(element[DB.WAREHOUSE], warehouses).label,
      [DB.PRODUCT]: `${product.head_name} / ${product.label}`,
    });
  });
  return formatted;
};

export const formatTransactionData = (
  transaction,
  accountType,
  paidAmount,
  essentials
) => {
  let person = findPerson(
    transaction.person,
    essentials.suppliers,
    essentials.customers
  );
  return {
    ...transaction,
    [DB.PAID_AMOUNT]: paidAmount,
    [DB.ACCOUNT_TYPE]: accountType
      ? findAccountType(accountType.id, essentials.accountTypes).label
      : null,
    [DB.PERSON]: person.label,
    [DB.PERSON_TYPE]: person.person_type,
    [DB.TRANSACTION_DETAIL]: formatTransactionDetail(
      transaction.transaction_detail,
      essentials.products,
      essentials.productHeads,
      essentials.warehouses
    ),
  };
};

export const formatAllStock = (data) => {
  let stock = {};
  data.forEach((element) => {
    let currentProduct = element.product;
    let currentWarehouse = element.warehouse;
    let currentNature = element.transaction__nature;
    let currentQuantity =
      currentNature === "C" ? element.quantity__sum : -element.quantity__sum;
    if (stock[currentProduct]) {
      if (stock[currentProduct][currentWarehouse]) {
        stock[currentProduct][currentWarehouse] =
          stock[currentProduct][currentWarehouse] + currentQuantity;
      } else {
        stock[currentProduct] = {
          ...stock[currentProduct],
          [currentWarehouse]: currentQuantity,
        };
      }
    } else {
      stock[currentProduct] = {
        [currentWarehouse]: currentQuantity,
      };
    }
  });
  return stock;
};
