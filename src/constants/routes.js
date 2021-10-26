import * as url from "./routesConstants";

import CustomerTransaction from "../app/views/CustomerTransaction/CustomerTransaction";
import SupplierTransaction from "../app/views/SupplierTransaction/SupplierTransaction";
import LedgerTransaction from "../app/views/LedgerTransaction/LedgerTransaction";

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
];
