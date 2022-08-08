import React from 'react';

import CustomTable from '../../components/CustomTable';

import {
  ACTIVITY_LOG_CATEGORY,
  ACTIVITY_LOG_TYPE,
} from '../../../constants/choices';

import moment from 'moment';

const COLUMNS = [
  {
    accessor: 'index',
    Header: 'Sr#',
  },
  {
    accessor: 'time_stamp',
    Header: 'Time',
    Cell: (row) => {
      return (
        <div>
          {moment(row.value, 'YYYY-MM-DD HH:mm:ss').format(
            'dddd, MMMM Do YYYY, h:mm:ss a'
          )}
        </div>
      );
    },
  },
  {
    accessor: 'username',
    Header: 'User',
  },
  {
    accessor: 'type',
    Header: 'type',
    Cell: (row) => {
      return (
        <div>
          {ACTIVITY_LOG_TYPE.find((type) => type.value === row.value).label}
        </div>
      );
    },
  },
  {
    accessor: 'category',
    Header: 'Category',
    Cell: (row) => {
      return (
        <div>
          {ACTIVITY_LOG_CATEGORY.find((cat) => cat.value === row.value).label}
        </div>
      );
    },
  },
  {
    accessor: 'detail',
    Header: 'Detail',
  },
];

const ActivityLogTable = ({ data }) => {
  return <CustomTable columns={COLUMNS} data={data} />;
};

export default ActivityLogTable;
