import * as Yup from 'yup';

import { reqNumberSchema, reqObjectSchema } from '../../utilities/yup';
import { FIELDS } from './constants';

const REQUIRED = 'Required';

export const validationSchema = Yup.object().shape({
  [FIELDS.date]: Yup.date().typeError('Invalid date').required(REQUIRED),
  [FIELDS.detail]: Yup.array().of(
    Yup.object().shape({
      [FIELDS.product]: reqObjectSchema,
      [FIELDS.warehouse]: reqObjectSchema,
      [FIELDS.quantity]: reqNumberSchema,
      [FIELDS.calculated_rate]: reqNumberSchema,
      [FIELDS.rate_yards]: reqNumberSchema,
      [FIELDS.actual_yards]: reqNumberSchema,
      [FIELDS.unit]: reqObjectSchema,
      [FIELDS.rate]: reqNumberSchema,
      [FIELDS.total]: reqNumberSchema,
      [FIELDS.total_yards]: reqNumberSchema,
    })
  ),
});
