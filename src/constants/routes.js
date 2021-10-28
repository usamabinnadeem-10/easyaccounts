import * as url from "./routesConstants";

import CustomerTransaction from "../app/views/CustomerTransaction/CustomerTransaction";
import SupplierTransaction from "../app/views/SupplierTransaction/SupplierTransaction";
import Ledgers from "../app/views/Ledgers/Ledgers";
import LedgerTransaction from "../app/views/LedgerTransaction/LedgerTransaction";
import ViewTransactions from "../app/views/ViewTransactions/ViewTransactions";

export const unauthenticatedRoutes = [{}];

export const authenticatedRoutes = [
  {
    component: CustomerTransaction,
    path: url.CUSTOMER_TRANSACTION,
  },
  {
    component: SupplierTransaction,
    path: url.SUPPLIER_TRANSACTION,
  },
  {
    component: LedgerTransaction,
    path: url.LEDGER_TRANSACTION,
  },
  {
    component: Ledgers,
    path: url.LEDGERS,
  },
  {
    component: ViewTransactions,
    path: url.TRANSACTIONS,
  },
];
