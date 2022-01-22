/* eslint-disable no-loop-func */
/* eslint-disable react-hooks/exhaustive-deps */

import {useEffect} from 'react';
import {useRef} from 'react';

import { useSelector } from "react-redux";

const DEFAULTS = {
    'warehouses': 'warehouses',
    'products': 'products',
    'suppliers': 'persons',
    'customers': 'persons',
    'accountTypes': 'accounts',
    'expenseAccounts': 'expenseAccounts'
}

const useEssentials = () => {
  let essentials = useSelector((state) => state.essentials);
  let values = useRef({});

  useEffect(() => {
    if (essentials.fetched) {
        for (let [key, value] of Object.entries(essentials)) {
            let currentEssential = DEFAULTS[key];
            if (currentEssential) {
                value.forEach((val) => {
                    !(currentEssential in values.current) && (values.current[currentEssential] = {})
                    values.current = {
                        ...values.current,
                        [currentEssential]: {
                            ...values.current[currentEssential],
                            [val.value]: val,
                        }
                    }
                })
            }
          }
    }
  }, [essentials.fetched]);

  return values.current;
};

export default useEssentials;
