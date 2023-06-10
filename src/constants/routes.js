import { lazy } from 'react';

import * as url from './routesConstants';

import CustomerTransaction from '../app/views/CustomerTransaction/CustomerTransaction';
import SupplierTransaction from '../app/views/SupplierTransaction/SupplierTransaction';
const Ledgers = lazy(() => import('../app/views/Ledgers/Ledgers'));
const LedgerEntry = lazy(() => import('../app/views/LedgerEntry'));
const ViewTransactions = lazy(() => import('../app/views/ViewTransactions'));
const Daybook = lazy(() => import('../app/views/Daybook/Daybook'));
const ViewExpenses = lazy(() => import('../app/views/ViewExpenses'));
const ViewAllBalances = lazy(() => import('../app/views/ViewAllBalances'));
const ViewAllStock = lazy(() => import('../app/views/ViewAllStock'));
const ViewDetailedStock = lazy(() => import('../app/views/ViewDetailedStock'));
const PersonalCheques = lazy(() => import('../app/views/PersonalCheques'));
const ExternalCheques = lazy(() => import('../app/views/ExternalCheques'));
const AccountHistory = lazy(() => import('../app/views/AccountHistory'));
// const DyingIssue = lazy(() => import('../app/views/DyingIssue'));
// const DyingReturn = lazy(() => import('../app/views/DyingReturn'));
const RawPurchase = lazy(() => import('../app/views/Raw/RawPurchase'));
const RawDebit = lazy(() => import('../app/views/Raw/RawDebit'));
const RawTransfer = lazy(() => import('../app/views/Raw/RawTransfer'));
const StockTransfer = lazy(() => import('../app/views/StockTransfer'));
const ViewTransfers = lazy(() => import('../app/views/ViewTransfers'));
const Payment = lazy(() => import('../app/views/Payment'));
const ProductPerformance = lazy(() =>
  import('../app/views/ProductPerformance'),
);
const ViewSingleTransaction = lazy(() =>
  import('../app/containers/ViewSingleTransaction'),
);
const PaymentList = lazy(() => import('../app/views/PaymentList'));
const CreateAsset = lazy(() => import('../app/views/Asset'));
const AssetList = lazy(() => import('../app/views/AssetList'));
const BalanceSheet = lazy(() => import('../app/views/BalanceSheet'));
const IncomeStatement = lazy(() => import('../app/views/IncomeStatement'));
const ActivityLogs = lazy(() => import('../app/views/ActivityLogs'));
const LowStock = lazy(() => import('../app/views/LowStock'));
const RevenueByPeriod = lazy(() => import('../app/views/RevenueByPeriod'));
const RawStock = lazy(() => import('../app/views/Raw/RawStock'));
const RawTransactionsList = lazy(() =>
  import('../app/views/Raw/ViewRawTransactions'),
);
const RawDebitTransactionsList = lazy(() =>
  import('../app/views/Raw/ViewRawDebitTransactions'),
);
const RawTransferTransactionsList = lazy(() =>
  import('../app/views/Raw/ViewRawTransfers'),
);
const RawPurchaseReceipt = lazy(() =>
  import('../app/components/RawReceipts/Purchase'),
);
const RawDebitReceipt = lazy(() =>
  import('../app/components/RawReceipts/Debit'),
);

export const authenticatedRoutes = [
  // ----------- Reports Routes ---------------
  {
    component: Daybook,
    path: url.VIEW_DAYBOOK,
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
    component: LowStock,
    path: url.LOW_STOCK,
  },
  {
    component: ViewDetailedStock,
    path: url.DETAILED_STOCK,
  },
  {
    component: AccountHistory,
    path: url.ACCOUNT_HISTORY,
  },
  {
    component: BalanceSheet,
    path: url.BALANCE_SHEET_ROUTE,
  },
  {
    component: IncomeStatement,
    path: url.INCOME_STATEMENT_ROUTE,
  },
  {
    component: RevenueByPeriod,
    path: url.REVENUE_BY_PERIOD,
  },
  {
    component: ProductPerformance,
    path: url.PRODUCT_PERFORMANCE,
  },
  {
    component: ActivityLogs,
    path: url.ACTIVITY_LOGS_ROUTE,
  },
  // ----------- Invoices Routes ---------------
  {
    component: ViewTransactions,
    path: url.TRANSACTIONS,
  },
  {
    component: CustomerTransaction,
    path: url.CUSTOMER_TRANSACTION,
  },
  {
    component: SupplierTransaction,
    path: url.SUPPLIER_TRANSACTION,
  },
  {
    component: ViewSingleTransaction,
    path: url.VIEW_SINGLE_TRANSACTION,
  },
  // ----------- Ledgers Routes ---------------
  {
    component: Ledgers,
    path: url.LEDGERS,
  },
  {
    component: LedgerEntry,
    path: url.LEDGER_TRANSACTION,
  },
  // ----------- Payments Routes ---------------
  {
    component: Payment,
    path: url.PAYMENT_ROUTE,
  },
  {
    component: PaymentList,
    path: url.PAYMENT_LIST_ROUTE,
  },
  // ----------- Expenses Routes ---------------
  {
    component: ViewExpenses,
    path: url.VIEW_EXPENSES,
  },
  // ----------- Transfer Routes ---------------
  {
    component: ViewTransfers,
    path: url.VIEW_TRANSFERS,
  },
  {
    component: StockTransfer,
    path: url.STOCK_TRANSFER,
  },
  // ----------- Cheque Routes ---------------
  {
    component: PersonalCheques,
    path: url.PERSONAL_CHEQUE,
  },
  {
    component: ExternalCheques,
    path: url.EXTERNAL_CHEQUE,
  },
  // ----------- Asset Routes ---------------
  {
    component: CreateAsset,
    path: url.ASSET_CREATE_ROUTE,
  },
  {
    component: AssetList,
    path: url.ASSET_LIST_ROUTE,
  },
  // ----------- Raw Routes ---------------
  {
    component: RawTransactionsList,
    path: url.LIST_RAW_TRANSACTIONS_ROUTE,
  },
  {
    component: RawDebitTransactionsList,
    path: url.LIST_RAW_DEBIT_TRANSACTIONS_ROUTE,
  },
  {
    component: RawTransferTransactionsList,
    path: url.LIST_RAW_TRANSFER_TRANSACTIONS_ROUTE,
  },
  {
    component: RawPurchase,
    path: url.RAW_PURCHASE_ROUTE,
  },
  {
    component: RawPurchase,
    path: url.EDIT_RAW_PURCHASE_ROUTE,
  },
  {
    component: RawPurchaseReceipt,
    path: url.RAW_PURCHASE_RECEIPT,
  },
  {
    component: RawDebit,
    path: url.RAW_DEBIT_ROUTE,
  },
  {
    component: RawDebit,
    path: url.EDIT_RAW_DEBIT_ROUTE,
  },
  {
    component: RawDebitReceipt,
    path: url.RAW_DEBIT_RECEIPT,
  },
  {
    component: RawTransfer,
    path: url.RAW_TRANSFER_ROUTE,
  },
  {
    component: RawTransfer,
    path: url.EDIT_RAW_TRANSFER_ROUTE,
  },
  {
    component: RawStock,
    path: url.RAW_STOCK_ROUTE,
  },
  // ----------- Dying Routes ---------------
  // {
  //   component: DyingIssue,
  //   path: url.ISSUE_DYING,
  // },
  // {
  //   component: DyingReturn,
  //   path: url.RETURN_DYING,
  // },
];
