import { LEDGERS, TRANSACTIONS } from "../../../constants/routesConstants";

export const ACCOUNTS = "Accounts";
export const LEDGER = "Ledgers";
export const CHEQUES = "Cheques";
export const TRANSACTION = "Transactions";

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
