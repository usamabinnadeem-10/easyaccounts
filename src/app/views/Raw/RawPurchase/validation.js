import Yup from '../../../utilities/yup';
import { reqNumberSchema, reqObjectSchema } from '../../../utilities/yup';

import { FIELDS } from './constants';

const REQUIRED = 'Required';

export const schema = Yup.object().shape({
  [FIELDS.person]: reqObjectSchema,
  [FIELDS.manual_invoice_serial]: reqNumberSchema,
  [FIELDS.date]: Yup.date().typeError('Invalid date').required(REQUIRED),
  [FIELDS.lots]: Yup.array().of(
    Yup.object().shape({
      [FIELDS.raw_product]: reqObjectSchema,
      [FIELDS.issued]: Yup.boolean().required(REQUIRED),
      [FIELDS.dying_unit]: Yup.object().typeError(REQUIRED).nullable(),
      [FIELDS.lot_detail]: Yup.array()
        .of(
          Yup.object().shape({
            [FIELDS.quantity]: reqNumberSchema,
            [FIELDS.actual_gazaana]: reqNumberSchema,
            [FIELDS.expected_gazaana]: reqNumberSchema,
            [FIELDS.formula]: reqObjectSchema,
            [FIELDS.warehouse]: Yup.object().typeError(REQUIRED).nullable(),
            [FIELDS.rate]: reqNumberSchema,
          })
        )
        .unique(
          ['actual_gazaana', 'expected_gazaana', 'formula'],
          'Detail is not unique'
        ),
    })
  ),
});
