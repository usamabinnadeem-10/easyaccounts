import { FIELDS } from '../../containers/CustomFilters/constants';
import {
  ACTIVITY_LOG_CATEGORY,
  ACTIVITY_LOG_TYPE,
} from '../../../constants/choices';

export const FILTERS = [
  {
    qp: 'time_stamp__gte',
    type: FIELDS.DATE,
    placeholder: 'Time (more than)',
    variant: 'start',
  },
  {
    qp: 'time_stamp__lte',
    type: FIELDS.DATE,
    placeholder: 'Time (less than)',
    variant: 'end',
  },
  {
    qp: 'category',
    options: ACTIVITY_LOG_CATEGORY,
    type: FIELDS.SELECT,
    placeholder: 'Category',
  },
  {
    qp: 'type',
    options: ACTIVITY_LOG_TYPE,
    type: FIELDS.SELECT,
    placeholder: 'Activity type',
  },
  {
    qp: 'detail__icontains',
    type: FIELDS.TEXT,
    placeholder: 'Detail',
  },
];
