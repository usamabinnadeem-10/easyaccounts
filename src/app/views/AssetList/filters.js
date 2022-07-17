import { FIELDS } from '../../containers/CustomFilters/constants';
import { ASSET_TYPES, ASSET_STATUS } from '../../../constants/choices';

export const FILTERS = [
  {
    qp: 'name__icontains',
    type: FIELDS.TEXT,
    placeholder: 'Name',
  },
  {
    qp: 'value',
    type: FIELDS.NUMBER,
    placeholder: 'Value',
  },
  {
    qp: 'value__gte',
    type: FIELDS.NUMBER,
    placeholder: 'Value (more than)',
  },
  {
    qp: 'value__lte',
    type: FIELDS.NUMBER,
    placeholder: 'Value (less than)',
  },
  // {
  //   qp: 'date',
  //   type: FIELDS.DATE,
  //   placeholder: 'Date',
  // },
  {
    qp: 'date__gte',
    type: FIELDS.DATE,
    placeholder: 'Date (more than)',
    variant: 'start',
  },
  {
    qp: 'date__lte',
    type: FIELDS.DATE,
    placeholder: 'Date (less than)',
    variant: 'end',
  },
  {
    qp: 'type',
    options: ASSET_TYPES,
    type: FIELDS.SELECT,
    placeholder: 'Type',
  },
  {
    qp: 'status',
    options: ASSET_STATUS,
    type: FIELDS.SELECT,
    placeholder: 'Status',
  },
];
