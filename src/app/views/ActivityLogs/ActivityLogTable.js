import React from 'react';

import CustomTable from '../../components/CustomTable';

import {
  ACTIVITY_LOG_CATEGORY,
  ACTIVITY_LOG_TYPE,
} from '../../../constants/choices';

import moment from 'moment';

const COLUMNS = [
  {
    accessorKey: 'index',
    header: 'Sr#',
  },
  {
    accessorKey: 'time_stamp',
    header: 'Time',
    cell: (row) => {
      return (
        <div>
          {moment(row.value, 'YYYY-MM-DD HH:mm:ss').format(
            'dddd, MMMM Do YYYY, h:mm:ss a',
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'username',
    header: 'User',
  },
  {
    accessorKey: 'type',
    header: 'type',
    cell: (row) => {
      return (
        <div>
          {ACTIVITY_LOG_TYPE.find((type) => type.value === row.value).label}
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: (row) => {
      return (
        <div>
          {ACTIVITY_LOG_CATEGORY.find((cat) => cat.value === row.value).label}
        </div>
      );
    },
  },
  {
    accessorKey: 'detail',
    header: 'Detail',
  },
];

const ActivityLogTable = ({ data }) => {
  return <CustomTable columns={COLUMNS} data={data} />;
};

export default ActivityLogTable;
