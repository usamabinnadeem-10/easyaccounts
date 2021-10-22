export const ACCOUNTS = "Accounts";
export const LEDGERS = "Ledgers";
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
        name: LEDGERS,
      },
      {
        name: CHEQUES,
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
