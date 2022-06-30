import Yup from '../../utilities/yup';
import {
  reqObjectSchema,
  notReqObjectSchema,
  reqTextSchema,
  smallPositiveReqNumberSchema,
} from '../../utilities/yup';

import { FIELDS } from './constants';

export const schema = Yup.object().shape({
  [FIELDS.person]: reqObjectSchema,
  [FIELDS.account_type]: notReqObjectSchema,
  [FIELDS.date]: Yup.date().typeError('Invalid date'),
  [FIELDS.nature]: reqObjectSchema,
  [FIELDS.detail]: reqTextSchema,
  [FIELDS.amount]: smallPositiveReqNumberSchema,
});
