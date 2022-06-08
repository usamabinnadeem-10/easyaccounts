import Yup from '../../utilities/yup';
import { reqObjectSchema, notReqObjectSchema } from '../../utilities/yup';

import { FIELDS } from './constants';

const REQUIRED = 'Required';
const POSITIVE_NUM_ERROR = 'Please enter a valid value';
const INVALID_NUMBER = 'Not a valid number';

const postiveNumberSchema = Yup.number()
  .typeError(INVALID_NUMBER)
  .min(0.01, POSITIVE_NUM_ERROR)
  .required(REQUIRED);

export const schema = Yup.object().shape({
  [FIELDS.person]: reqObjectSchema,
  [FIELDS.date]: Yup.date().typeError('Invalid Date'),
  [FIELDS.nature]: reqObjectSchema,
  [FIELDS.amount]: postiveNumberSchema,
  [FIELDS.account_type]: notReqObjectSchema,
});
