import {
  LEDGERS,
  TRANSACTIONS,
  VIEW_DAYBOOK,
  VIEW_EXPENSES,
  ALL_BALANCES,
  ALL_STOCK,
  DETAILED_STOCK,
} from "../../../constants/routesConstants";

export const VIEW = "View";
export const LEDGER = "Ledgers";
export const CHEQUES = "Cheques";
export const TRANSACTION = "Transactions";
export const DAYBOOK = "Daybook";
export const EXPENSE = "Expenses";

export const REPORTS = "Reports";
export const BALANCES = "Balances";
export const STOCK = "Stock";
export const VIEW_DETAILED_STOCK = "Detailed Stock";

// export const

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
    ],
  },
];
