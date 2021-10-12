import * as url from "./routesConstants";

import CustomerTransaction from "../app/views/CustomerTransaction/CustomerTransaction";
import SupplierTransaction from "../app/views/SupplierTransaction/SupplierTransaction";

export const unauthenticatedRoutes = [{}];

export const authenticatedRoutes = [
  {
    component: CustomerTransaction,
    path: url.CUSTOMER_TRANSACTION,
  },
  {
    component: SupplierTransaction,
    path: url.SUPPLIER_TRANSACTION,
  },
];
