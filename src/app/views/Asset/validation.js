import Yup from '../../utilities/yup';
import {
  reqObjectSchema,
  smallPositiveReqNumberSchema,
  reqTextSchema,
} from '../../utilities/yup';

import { FIELDS } from './constants';

export const schema = Yup.object().shape({
  [FIELDS.date]: Yup.date().typeError('Invalid Date'),
  [FIELDS.name]: reqTextSchema,
  [FIELDS.value]: smallPositiveReqNumberSchema,
  [FIELDS.status]: reqObjectSchema,
  [FIELDS.type]: reqObjectSchema,
  [FIELDS.sold_value]: Yup.number()
    .nullable()
    .when('status', {
      is: (val) => val.value === 'S',
      then: smallPositiveReqNumberSchema,
    }),
  [FIELDS.sold_date]: Yup.date()
    .typeError('Invalid Date')
    .nullable()
    .when('status', {
      is: (val) => val.value === 'S',
      then: Yup.date().typeError('Invalid Date').required('Required'),
    })
    .when('date', (date, schema) => date && schema.min(date)),
});
