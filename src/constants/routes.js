import * as url from "./routesConstants";

import CustomerTransaction from "../app/views/CustomerTransaction/CustomerTransaction";
import SupplierTransaction from "../app/views/SupplierTransaction/SupplierTransaction";
import Ledgers from "../app/views/Ledgers/Ledgers";
import LedgerTransaction from "../app/views/LedgerTransaction/LedgerTransaction";
import ViewTransactions from "../app/views/ViewTransactions/ViewTransactions";
import ViewSingleTransaction from "../app/containers/ViewSingleTransaction/ViewSingleTransaction";
import Daybook from "../app/views/Daybook/Daybook";
import ViewExpenses from "../app/views/ViewExpenses/ViewExpenses";

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
  {
    component: ViewSingleTransaction,
    path: url.VIEW_SINGLE_TRANSACTION,
  },
  {
    component: Daybook,
    path: url.VIEW_DAYBOOK,
  },
  {
    component: ViewExpenses,
    path: url.VIEW_EXPENSES,
  },
];
