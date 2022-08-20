import React from 'react';
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { LoadingButton } from '@mui/lab';

import CustomFilters from '../../containers/CustomFilters';
import CustomTable from '../../components/CustomTable';
import Heading from '../../components/Heading';

import { ESSENTIAL_URLS } from '../../../constants/restEndPoints';

import { getFilters } from './utils';
import { formatData } from './utils';

import { COLUMNS } from './constants';

import instance from '../../../utils/axiosApi';
import { cacheAccountHistory } from '../../../store/cache';

const AccountHistory = (props) => {
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.essentials.accountTypes);
  const accountHistoryCache = useSelector(
    (state) => state.cache.accountHistoryCache
  );
  const [data, setData] = useState(accountHistoryCache.data || []);
  const [rawData, setRawData] = useState(accountHistoryCache.rawData || []);
  const [next, setNext] = useState(accountHistoryCache.next || null);
  const [loading, setLoading] = useState(false);

  // set cache in redux store
  const setCache = (data, rawData, next) => {
    dispatch(
      cacheAccountHistory({
        data,
        rawData,
        next,
      })
    );
  };

  const handleSearch = (data) => {
    let newData = [...data.data.results];
    let formattedData = formatData(newData);
    let next = data.data.next;
    setRawData(newData);
    setData(formattedData);
    setNext(next);
    setCache(formattedData, newData, next);
  };

  const loadMore = () => {
    setLoading(true);
    instance.get(next).then((response) => {
      let newData = [...rawData, ...response.data.data.results];
      let formattedData = formatData(newData);
      let next = response.data.data.next;
      setRawData(newData);
      setData(formattedData);
      setLoading(false);
      setNext(next);
      setCache(formattedData, newData, next);
    });
  };

  return (
    <div>
      <Heading heading='Account History' />
      <CustomFilters
        api={ESSENTIAL_URLS.ACCOUNT_HISTORY}
        onSearch={handleSearch}
        filters={getFilters(accounts)}
      />
      {data.length > 0 && <CustomTable columns={COLUMNS} data={data} />}
      <LoadingButton
        sx={{ mt: 2 }}
        disabled={!next}
        onClick={loadMore}
        loading={loading}>
        Load more
      </LoadingButton>
    </div>
  );
};

export default AccountHistory;
