import { LEDGERS } from "../../../constants/routesConstants";

export const ACCOUNTS = "Accounts";
export const LEDGER = "Ledgers";
export const CHEQUES = "Cheques";

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
