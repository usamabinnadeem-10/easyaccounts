import * as actionTypes from "./actionTypes";

import { renameKeys, groupByField } from "../../utils/objectUtils";

const initialState = {
  warehouses: [],
  accountTypes: [],
  customers: [],
  suppliers: [],
  productHeads: [],
  products: [],
  downloadedCustomers: false,
  downloadedSuppliers: false,
  downloadedRest: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_ESSENTIALS_SUCCESS:
      return {
        ...state,
        downloadedRest: true,
      };

    case actionTypes.GET_ALL_ACCOUNT_TYPES_SUCCESS:
      const types = renameKeys(
        "id",
        "value",
        renameKeys("name", "label", action.payload)
      );
      return {
        ...state,
        accountTypes: types,
      };

    case actionTypes.GET_ALL_CUSTOMERS_SUCCESS:
      const customers = renameKeys(
        "id",
        "value",
        renameKeys("name", "label", action.payload)
      );
      return {
        ...state,
        customers: customers,
        downloadedCustomers: true,
      };

    case actionTypes.GET_ALL_SUPPLIERS_SUCCESS:
      const suppliers = renameKeys(
        "id",
        "value",
        renameKeys("name", "label", action.payload)
      );
      return {
        ...state,
        suppliers: suppliers,
        downloadedSuppliers: true,
      };

    case actionTypes.GET_ALL_PRODUCT_HEAD_SUCCESS:
      const heads = renameKeys(
        "id",
        "value",
        renameKeys("head_name", "label", action.payload)
      );
      return {
        ...state,
        productHeads: heads,
      };

    case actionTypes.GET_ALL_PRODUCT_SUCCESS:
      const products = renameKeys(
        "id",
        "value",
        renameKeys("color_name", "label", action.payload)
      );
      const grouped = groupByField(products, "product_head");
      return {
        ...state,
        products: grouped,
      };

    case actionTypes.GET_ALL_WAREHOUSE_SUCCESS:
      const warehouse = renameKeys(
        "id",
        "value",
        renameKeys("name", "label", action.payload)
      );
      return {
        ...state,
        warehouses: warehouse,
      };

    default:
      return state;
  }
};

export default reducer;
