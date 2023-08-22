/* eslint-disable no-loop-func */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import * as actions from '../../store/essentials';
import * as api from '../../store/essentials/api';

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

const useEssentials = () => {
  let dispatch = useDispatch();
  let essentials = useSelector((state) => state.essentials);
  let [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);

  const apiCallHelper = async (request) => {
    try {
      const response = await request();
      return response.data;
    } catch (error) {
      return {
        data: [],
      };
    }
  };

  const loadInitialData = async () => {
    const warehouses = await apiCallHelper(api.getWarehouseApi);
    const accounts = await apiCallHelper(api.getAccountsApi);
    const persons = await apiCallHelper(api.getAllPersonApi);
    const products = await apiCallHelper(api.getProductApi);
    const expenseAccounts = await apiCallHelper(api.getExpenseAccountsApi);
    const areas = await apiCallHelper(api.getAreasApi);
    const categories = await apiCallHelper(api.getCategoriesApi);

    dispatch(actions.getAllWarehouseSuccess(warehouses ?? []));
    dispatch(actions.getAllAccountTypesSuccess(accounts ?? []));

    dispatch(
      actions.getAllCustomersSuccess(
        persons?.filter((p) => p.person_type === 'C') ?? [],
      ),
    );
    dispatch(
      actions.getAllSuppliersSuccess(
        persons?.filter((p) => p.person_type === 'S') ?? [],
      ),
    );
    dispatch(
      actions.getAllAdvanceExpensesSuccess(
        persons?.filter((p) => p.person_type === 'EXA') ?? [],
      ),
    );
    dispatch(
      actions.getAllEquitySuccess(
        persons?.filter((p) => p.person_type === 'E') ?? [],
      ),
    );

    dispatch(actions.getAllProductSuccess(products ?? []));
    dispatch(actions.getAllExpenseAccountsSuccess(expenseAccounts ?? []));
    dispatch(actions.getAllAreasSuccess(areas ?? []));
    dispatch(actions.getAllCategoriesSuccess(categories ?? []));

    setLoading(false);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

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

  return { values, loading };
};

export default useEssentials;
