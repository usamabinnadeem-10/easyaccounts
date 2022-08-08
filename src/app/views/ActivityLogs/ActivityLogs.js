import React from 'react';
import { useState } from 'react';

import { LoadingButton } from '@mui/lab';

import Heading from '../../components/Heading';
import CustomFilters from '../../containers/CustomFilters';
import ActivityLogTable from './ActivityLogTable';

import { REPORTS_APIS } from '../../../constants/restEndPoints';

import { FILTERS } from './filters';

import instance from '../../../utils/axiosApi';

const ActivityLogs = () => {
  const [data, setData] = useState([]);
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(null);

  const formatData = (data) => {
    return data.map((d, idx) => ({ ...d, index: idx + 1 }));
  };

  const handleSearch = (data) => {
    setData(formatData(data.results));
    setNext(data.next);
  };

  const loadMore = () => {
    setLoading(true);
    instance
      .get(next)
      .then((response) => {
        let newData = formatData([...data, ...response.data.results]);
        setData(newData);
        setLoading(false);
        setNext(response.data.next);
      })
      .then((response) => {
        setLoading(false);
      });
  };

  return (
    <>
      <Heading heading={'Activity Logs'} />
      <CustomFilters
        api={REPORTS_APIS.ACTIVITY_LOGS_LIST}
        onSearch={handleSearch}
        filters={FILTERS}
      />
      {data.length > 0 ? <ActivityLogTable data={data} /> : <></>}
      <LoadingButton
        fullWidth
        sx={{ my: 2 }}
        disabled={!next}
        onClick={loadMore}
        loading={loading}>
        Load more
      </LoadingButton>
    </>
  );
};

export default ActivityLogs;
