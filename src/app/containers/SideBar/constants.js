import {
  LEDGERS,
  TRANSACTIONS,
  VIEW_DAYBOOK,
  VIEW_EXPENSES,
  ALL_BALANCES,
  ALL_STOCK,
  DETAILED_STOCK,
  PRODUCT_PERFORMANCE,
  PERSONAL_CHEQUE,
  EXTERNAL_CHEQUE,
  ACCOUNT_HISTORY,
} from "../../../constants/routesConstants";

export const VIEW = "View";
export const LEDGER = "Ledgers";
export const CHEQUES = "Cheques";
export const TRANSACTION = "Transactions";
export const DAYBOOK = "Daybook";
export const EXPENSE = "Expenses";
export const ACCOUNTS_HISTORY = "Account History";

export const REPORTS = "Reports";
export const BALANCES = "Balances";
export const STOCK = "Stock";
export const VIEW_DETAILED_STOCK = "Detailed Stock";
export const PRODUCT_PERFORMANCE_HISTORY = "Product Performance";
export const CHEQUE_MANAGEMENT = "Cheque Management";
export const PERSONAL_CHEQUES = "Personal Cheques";
export const EXTERNAL_CHEQUES = "Party Cheques";

export const DRAWER_WIDTH = 240;

export const SIDEBAR = [
  {
    panelName: VIEW,
    panelData: [
      {
        name: LEDGER,
        route: LEDGERS,
      },
      {
        name: TRANSACTION,
        route: TRANSACTIONS,
      },
      {
        name: DAYBOOK,
        route: VIEW_DAYBOOK,
      },
      {
        name: EXPENSE,
        route: VIEW_EXPENSES,
      },
      {
        name: ACCOUNTS_HISTORY,
        route: ACCOUNT_HISTORY,
      },
    ],
  },
  {
    panelName: REPORTS,
    panelData: [
      {
        name: BALANCES,
        route: ALL_BALANCES,
      },
      {
        name: STOCK,
        route: ALL_STOCK,
      },
      {
        name: VIEW_DETAILED_STOCK,
        route: DETAILED_STOCK,
      },
      {
        name: PRODUCT_PERFORMANCE_HISTORY,
        route: PRODUCT_PERFORMANCE,
      },
    ],
  },
  {
    panelName: CHEQUE_MANAGEMENT,
    panelData: [
      {
        name: PERSONAL_CHEQUES,
        route: PERSONAL_CHEQUE,
      },
      {
        name: EXTERNAL_CHEQUES,
        route: EXTERNAL_CHEQUE,
      },
    ],
  },
];
