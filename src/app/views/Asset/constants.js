import { getToday } from '../../utilities/stringUtils';

import { ASSET_STATUS } from '../../../constants/choices';

export const FIELDS = {
  date: 'date',
  name: 'name',
  value: 'value',
  status: 'status',
  type: 'type',
  sold_value: 'sold_value',
  sold_date: 'sold_date',
};

export const INITIAL_VALUES = {
  [FIELDS.name]: '',
  [FIELDS.value]: '',
  [FIELDS.date]: getToday(),
  [FIELDS.status]: ASSET_STATUS[0],
  [FIELDS.type]: '',
  [FIELDS.sold_value]: '',
  [FIELDS.sold_date]: '',
};
