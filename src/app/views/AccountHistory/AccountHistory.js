import React from 'react';
import { useState } from 'react';

import { useSelector } from 'react-redux';

import { LoadingButton } from '@mui/lab';

import CustomFilters from '../../containers/CustomFilters';
import CustomTable from '../../components/CustomTable';
import Heading from '../../components/Heading';

import { ESSENTIAL_URLS } from '../../../constants/restEndPoints';

import { getFilters } from './utils';
import { formatData } from './utils';

import { COLUMNS } from './constants';

import instance from '../../../utils/axiosApi';

const AccountHistory = (props) => {
  const accounts = useSelector((state) => state.essentials.accountTypes);
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (data) => {
    let newData = [...data.data.results];
    setRawData(newData);
    setData(formatData(newData));
    setNext(data.data.next);
  };

  const loadMore = () => {
    setLoading(true);
    instance.get(next).then((response) => {
      let newData = [...rawData, ...response.data.data.results];
      setRawData(newData);
      setData(formatData(newData));
      setLoading(false);
      setNext(response.data.data.next);
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
