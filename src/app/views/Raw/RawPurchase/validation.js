import Yup from '../../../utilities/yup';
import {
  positiveReqNumberSchema,
  reqObjectSchema,
  notReqObjectSchema,
} from '../../../utilities/yup';

import { FIELDS } from './constants';

const REQUIRED = 'Required';

export const schema = Yup.object().shape({
  [FIELDS.person]: reqObjectSchema,
  [FIELDS.manual_serial]: positiveReqNumberSchema,
  [FIELDS.date]: Yup.date().typeError('Invalid date').required(REQUIRED),
  [FIELDS.lots]: Yup.array().of(
    Yup.object().shape({
      [FIELDS.raw_product]: reqObjectSchema,
      [FIELDS.product_glue]: reqObjectSchema,
      [FIELDS.product_type]: reqObjectSchema,
      [FIELDS.issued]: Yup.boolean().required(REQUIRED),
      [FIELDS.dying_unit]: Yup.object().typeError(REQUIRED).nullable(),
      [FIELDS.lot_detail]: Yup.array()
        .of(
          Yup.object().shape({
            [FIELDS.quantity]: positiveReqNumberSchema,
            [FIELDS.actual_gazaana]: positiveReqNumberSchema,
            [FIELDS.expected_gazaana]: positiveReqNumberSchema,
            [FIELDS.rate_gazaana]: positiveReqNumberSchema,
            [FIELDS.formula]: notReqObjectSchema.nullable(true),
            [FIELDS.warehouse]: Yup.object().typeError(REQUIRED).nullable(),
            [FIELDS.rate]: positiveReqNumberSchema,
          }),
        )
        .unique(
          ['actual_gazaana', 'expected_gazaana', 'warehouse'],
          'Detail is not unique',
        ),
    }),
  ),
});
