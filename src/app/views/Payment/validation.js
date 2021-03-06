import Yup from '../../utilities/yup';
import {
  reqObjectSchema,
  notReqObjectSchema,
  smallPositiveReqNumberSchema,
} from '../../utilities/yup';

import { FIELDS } from './constants';

export const schema = Yup.object().shape({
  [FIELDS.person]: reqObjectSchema,
  [FIELDS.date]: Yup.date().typeError('Invalid Date'),
  [FIELDS.nature]: reqObjectSchema,
  [FIELDS.detail]: Yup.string().nullable(),
  [FIELDS.amount]: smallPositiveReqNumberSchema,
  [FIELDS.account_type]: notReqObjectSchema,
});
