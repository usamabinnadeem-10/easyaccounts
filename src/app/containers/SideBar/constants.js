import {
  LEDGERS,
  TRANSACTIONS,
  VIEW_DAYBOOK,
  VIEW_EXPENSES,
} from "../../../constants/routesConstants";

export const ACCOUNTS = "Accounts";
export const LEDGER = "Ledgers";
export const CHEQUES = "Cheques";
export const TRANSACTION = "Transactions";
export const DAYBOOK = "Daybook";
export const EXPENSE = "Expenses";

export const MANAGE = "Manage";
export const CUSTOMERS = "Customers";
export const PRODUCTS = "Products";

export const DRAWER_WIDTH = 240;

export const SIDEBAR = [
  {
    panelName: ACCOUNTS,
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
    panelName: MANAGE,
    panelData: [
      {
        name: CUSTOMERS,
      },
      {
        name: PRODUCTS,
      },
    ],
  },
];
