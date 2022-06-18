import Yup from '../../../utilities/yup';
import {
  positiveReqNumberSchema,
  reqObjectSchema,
} from '../../../utilities/yup';

import { FIELDS } from './constants';

const REQUIRED = 'Required';

export const schema = Yup.object().shape({
  [FIELDS.person]: reqObjectSchema,
  [FIELDS.manual_invoice_serial]: positiveReqNumberSchema,
  [FIELDS.date]: Yup.date().typeError('Invalid date').required(REQUIRED),
  [FIELDS.lots]: Yup.array().of(
    Yup.object().shape({
      [FIELDS.raw_product]: reqObjectSchema,
      [FIELDS.issued]: Yup.boolean().required(REQUIRED),
      [FIELDS.dying_unit]: Yup.object().typeError(REQUIRED).nullable(),
      [FIELDS.lot_detail]: Yup.array()
        .of(
          Yup.object().shape({
            [FIELDS.quantity]: positiveReqNumberSchema,
            [FIELDS.actual_gazaana]: positiveReqNumberSchema,
            [FIELDS.expected_gazaana]: positiveReqNumberSchema,
            [FIELDS.formula]: reqObjectSchema,
            [FIELDS.warehouse]: Yup.object().typeError(REQUIRED).nullable(),
            [FIELDS.rate]: positiveReqNumberSchema,
          })
        )
        .unique(
          ['actual_gazaana', 'expected_gazaana', 'formula', 'warehouse'],
          'Detail is not unique'
        ),
    })
  ),
});
