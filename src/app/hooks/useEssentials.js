/* eslint-disable no-loop-func */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';

import * as routes from '../../constants/routesConstants';
import * as actions from '../../store/essentials';

let REDUCER_ACTION_RELATION = {
  warehouses: actions.getAllWarehouse,
  accountTypes: actions.getAllAccountTypes,
  customers: actions.getAllCustomers,
  suppliers: actions.getAllSuppliers,
  equities: actions.getAllEquity,
  advanceExpenses: actions.getAllAdvanceExpenses,
  products: actions.getAllProduct,
  productCategories: actions.getAllCategories,
  expenseAccounts: actions.getAllExpenseAccounts,
  areas: actions.getAllAreas,
  rawProducts: actions.getAllRawProducts,
};

const DEFAULTS = {
  warehouses: 'warehouses',
  products: 'products',
  suppliers: 'persons',
  customers: 'persons',
  equities: 'persons',
  advanceExpenses: 'persons',
  accountTypes: 'accounts',
  expenseAccounts: 'expenseAccounts',
  productCategories: 'productCategories',
  areas: 'areas',
  rawProducts: 'rawProducts',
};

const REDUCER = {
  warehouses: 'warehouses',
  products: 'products',
  suppliers: 'suppliers',
  customers: 'customers',
  equities: 'equities',
  advanceExpenses: 'advanceExpenses',
  accountTypes: 'accountTypes',
  expenseAccounts: 'expenseAccounts',
  productCategories: 'productCategories',
  areas: 'areas',
  rawProducts: 'rawProducts',
};

const ALL_PERSONS = [
  REDUCER.customers,
  REDUCER.suppliers,
  REDUCER.advanceExpenses,
  REDUCER.equities,
];

const ROUTE_ACTION_MAP = {
  [routes.VIEW_DAYBOOK]: [
    ...ALL_PERSONS,
    REDUCER.accountTypes,
    REDUCER.expenseAccounts,
    REDUCER.products,
    REDUCER.warehouses,
  ],
  [routes.ALL_BALANCES]: ALL_PERSONS,
  [routes.ALL_STOCK]: [
    REDUCER.products,
    REDUCER.productCategories,
    REDUCER.warehouses,
  ],
  [routes.LOW_STOCK]: [
    REDUCER.productCategories,
    REDUCER.warehouses,
    REDUCER.products,
  ],
  [routes.DETAILED_STOCK]: [
    REDUCER.products,
    REDUCER.productCategories,
    REDUCER.warehouses,
    ...ALL_PERSONS,
  ],
  [routes.ACCOUNT_HISTORY]: [REDUCER.accountTypes],
  [routes.PRODUCT_PERFORMANCE]: [
    REDUCER.products,
    REDUCER.productCategories,
    REDUCER.customers,
    REDUCER.suppliers,
  ],
  [routes.CUSTOMER_TRANSACTION]: [
    REDUCER.customers,
    REDUCER.suppliers,
    REDUCER.products,
    REDUCER.accountTypes,
    REDUCER.warehouses,
  ],
  [routes.SUPPLIER_TRANSACTION]: [
    REDUCER.suppliers,
    REDUCER.products,
    REDUCER.accountTypes,
    REDUCER.warehouses,
  ],
  [routes.TRANSACTIONS]: [
    REDUCER.customers,
    REDUCER.suppliers,
    REDUCER.products,
    REDUCER.accountTypes,
    REDUCER.warehouses,
    REDUCER.productCategories,
  ],
  [routes.VIEW_SINGLE_TRANSACTION]: [
    ...ALL_PERSONS,
    REDUCER.accountTypes,
    REDUCER.warehouses,
  ],
  [routes.LEDGERS]: ALL_PERSONS,
  [routes.LEDGER_TRANSACTION]: [...ALL_PERSONS, REDUCER.accountTypes],
  [routes.PAYMENT_LIST_ROUTE]: [...ALL_PERSONS, REDUCER.accountTypes],
  [routes.PAYMENT_ROUTE]: [...ALL_PERSONS, REDUCER.accountTypes],
  [routes.VIEW_EXPENSES]: [REDUCER.accountTypes, REDUCER.expenseAccounts],
  [routes.VIEW_TRANSFERS]: [
    REDUCER.products,
    REDUCER.warehouses,
    REDUCER.productCategories,
  ],
  [routes.STOCK_TRANSFER]: [REDUCER.products, REDUCER.warehouses],
  [routes.EXTERNAL_CHEQUE]: [
    REDUCER.customers,
    REDUCER.suppliers,
    REDUCER.accountTypes,
  ],
  [routes.PERSONAL_CHEQUE]: [
    REDUCER.customers,
    REDUCER.suppliers,
    REDUCER.accountTypes,
  ],
  [routes.RAW_PURCHASE_ROUTE]: [REDUCER.suppliers, REDUCER.warehouses],
  [routes.RAW_STOCK_ROUTE]: [REDUCER.warehouses, REDUCER.rawProducts],
  [routes.RAW_DEBIT_ROUTE]: [
    REDUCER.warehouses,
    REDUCER.rawProducts,
    REDUCER.suppliers,
    REDUCER.customers,
  ],
  [routes.LIST_RAW_TRANSACTIONS_ROUTE]: [
    REDUCER.warehouses,
    REDUCER.rawProducts,
    REDUCER.suppliers,
    REDUCER.customers,
  ],
  [routes.LIST_RAW_DEBIT_TRANSACTIONS_ROUTE]: [
    REDUCER.warehouses,
    REDUCER.rawProducts,
    REDUCER.suppliers,
    REDUCER.customers,
  ],
  [routes.LIST_RAW_TRANSFER_TRANSACTIONS_ROUTE]: [REDUCER.warehouses],
  [routes.RAW_PURCHASE_RECEIPT]: [REDUCER.rawProducts],
};

const useEssentials = () => {
  let location = useLocation();
  let dispatch = useDispatch();
  let essentials = useSelector((state) => state.essentials);
  let [values, setValues] = useState({});

  useEffect(() => {
    let storeVariables = ROUTE_ACTION_MAP[location.pathname];
    if (storeVariables) {
      for (let i = 0; i < storeVariables.length; i++) {
        if (!essentials.fetched[storeVariables[i]]) {
          let action = REDUCER_ACTION_RELATION[storeVariables[i]];
          dispatch(action());
        }
      }
    }
  }, [location.pathname, essentials.fetchError]);

  useEffect(() => {
    let newValues = {};
    for (let [key, value] of Object.entries(REDUCER)) {
      let currentEssential = DEFAULTS[key];
      if (currentEssential) {
        essentials[value].forEach((val) => {
          !(currentEssential in newValues) &&
            (newValues[currentEssential] = {});
          newValues = {
            ...newValues,
            [currentEssential]: {
              ...newValues[currentEssential],
              [val.value]: val,
            },
          };
        });
      }
    }
    setValues(newValues);
  }, [essentials]);

  return values;
};

export default useEssentials;
