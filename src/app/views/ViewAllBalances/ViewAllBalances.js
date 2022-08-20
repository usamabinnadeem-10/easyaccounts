import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import CustomFilters from '../../containers/CustomFilters';
import CustomTable from '../../components/CustomTable/CustomTable';
import Empty from '../../components/Empty/Empty';
import Heading from '../../components/Heading';
import Printable from '../../containers/Printable';

import { useStyles } from './styles';
import { REPORTS_APIS } from '../../../constants/restEndPoints';
import { COLUMNS } from './constants';
import { formatBalances } from './utils';
import { getFilters } from './filters';

import { withSnackbar } from '../../hoc/withSnackbar';

import { cacheAllBalances } from '../../../store/cache';

const Balances = ({ role, persons }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  let filters = useMemo(() => getFilters(role), [role]);

  const allBalancesCache = useSelector((state) => state.cache.allBalancesCache);

  const [balancesData, setBalancesData] = useState(allBalancesCache || []);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleSearch = (data) => {
    let formattedBalances = formatBalances(data, persons);
    dispatch(cacheAllBalances(formattedBalances));
    setBalancesData(formattedBalances);
    setIsEmpty(formattedBalances.length === 0);
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.headerWrapper}>
          <Heading heading={'View All Balances'} />
        </div>
        <CustomFilters
          api={REPORTS_APIS.ALL_BALANCES}
          filters={filters}
          onSearch={handleSearch}
        />
        <Printable
          disablePrint={balancesData.length === 0}
          documentTitle='All Balances Report'>
          {balancesData.length > 0 && (
            <CustomTable data={balancesData} columns={COLUMNS} />
          )}
        </Printable>
        {isEmpty && <Empty />}
      </div>
    </>
  );
};

export default withSnackbar(Balances);
