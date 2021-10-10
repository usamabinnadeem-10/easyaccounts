import * as url from "./routesConstants";

import Transaction from "../app/components/Transaction/Transaction";

export const unauthenticatedRoutes = [{}];

export const authenticatedRoutes = [
  {
    component: Transaction,
    path: url.TRANSACTION,
  },
];

export const subRoutes = [
  {
    component: Transaction,
    path: url.TRANSACTION,
  },
];
