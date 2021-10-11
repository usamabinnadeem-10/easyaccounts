import * as url from "./routesConstants";

import CustomerTransaction from "../app/containers/CustomerTransaction/CustomerTransaction";
// import Transaction from "../app/views/Transaction/Transaction";

export const unauthenticatedRoutes = [{}];

export const authenticatedRoutes = [
  {
    component: CustomerTransaction,
    path: url.TRANSACTION,
  },
];

// export const subRoutes = [
//   {
//     component: Transaction,
//     path: url.TRANSACTION,
//   },
// ];
