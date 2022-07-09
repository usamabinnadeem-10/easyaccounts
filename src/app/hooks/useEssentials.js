/* eslint-disable no-loop-func */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';

const DEFAULTS = {
  warehouses: 'warehouses',
  products: 'products',
  suppliers: 'persons',
  customers: 'persons',
  equities: 'persons',
  advanceExpenses: 'persons',
  accountTypes: 'accounts',
  expenseAccounts: 'expenseAccounts',
};

const useEssentials = () => {
  let essentials = useSelector((state) => state.essentials);
  let [values, setValues] = useState({});

  useEffect(() => {
    if (essentials.fetched) {
      let newValues = {};
      for (let [key, value] of Object.entries(essentials)) {
        let currentEssential = DEFAULTS[key];
        if (currentEssential) {
          value.forEach((val) => {
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
    }
  }, [essentials.fetched, essentials]);

  return values;
};

export default useEssentials;
