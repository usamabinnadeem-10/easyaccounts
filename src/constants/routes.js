import { lazy } from 'react';

import * as url from './routesConstants';

import CustomerTransaction from '../app/views/CustomerTransaction/CustomerTransaction';
import SupplierTransaction from '../app/views/SupplierTransaction/SupplierTransaction';
const Ledgers = lazy(() => import('../app/views/Ledgers/Ledgers'));
const LedgerTransaction = lazy(() =>
  import('../app/views/LedgerTransaction/LedgerTransaction')
);
const ViewTransactions = lazy(() =>
  import('../app/views/ViewTransactions/ViewTransactions')
);
const ViewSingleTransaction = lazy(() =>
  import('../app/containers/ViewSingleTransaction/ViewSingleTransaction')
);
const Daybook = lazy(() => import('../app/views/Daybook/Daybook'));
const ViewExpenses = lazy(() =>
  import('../app/views/ViewExpenses/ViewExpenses')
);
const ViewAllBalances = lazy(() =>
  import('../app/views/ViewAllBalances/ViewAllBalances')
);
const ViewAllStock = lazy(() =>
  import('../app/views/ViewAllStock/ViewAllStock')
);
const ViewDetailedStock = lazy(() =>
  import('../app/views/ViewDetailedStock/ViewDetailedStock')
);
const ProductPerformance = lazy(() =>
  import('../app/views/ProductPerformance/ProductPerformance')
);
const PersonalCheques = lazy(() => import('../app/views/PersonalCheques'));
const ExternalCheques = lazy(() => import('../app/views/ExternalCheques'));
const AccountHistory = lazy(() => import('../app/views/AccountHistory'));
const DyingIssue = lazy(() => import('../app/views/DyingIssue'));
const DyingReturn = lazy(() => import('../app/views/DyingReturn'));
const RawPurchase = lazy(() => import('../app/views/Raw/RawPurchase'));
const StockTransfer = lazy(() => import('../app/views/StockTransfer'));
const ViewTransfers = lazy(() => import('../app/views/ViewTransfers'));

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
  {
    component: ViewAllBalances,
    path: url.ALL_BALANCES,
  },
  {
    component: ViewAllStock,
    path: url.ALL_STOCK,
  },
  {
    component: ViewDetailedStock,
    path: url.DETAILED_STOCK,
  },
  {
    component: ProductPerformance,
    path: url.PRODUCT_PERFORMANCE,
  },
  {
    component: PersonalCheques,
    path: url.PERSONAL_CHEQUE,
  },
  {
    component: ExternalCheques,
    path: url.EXTERNAL_CHEQUE,
  },
  {
    component: AccountHistory,
    path: url.ACCOUNT_HISTORY,
  },
  {
    component: DyingIssue,
    path: url.ISSUE_DYING,
  },
  {
    component: DyingReturn,
    path: url.RETURN_DYING,
  },
  {
    component: RawPurchase,
    path: url.RAW_PURCHASE_ROUTE,
  },
  {
    component: StockTransfer,
    path: url.STOCK_TRANSFER,
  },
  {
    component: ViewTransfers,
    path: url.VIEW_TRANSFERS,
  },
];
