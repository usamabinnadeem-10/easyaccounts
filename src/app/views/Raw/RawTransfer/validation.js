import Yup from '../../../utilities/yup';
import {
  positiveReqNumberSchema,
  reqObjectSchema,
  smallPositiveReqNumberSchema,
} from '../../../utilities/yup';

import { FIELDS } from './constants';

const REQUIRED = 'Required';

export const schema = Yup.object().shape({
  [FIELDS.manual_serial]: positiveReqNumberSchema,
  [FIELDS.from_warehouse]: reqObjectSchema,
  [FIELDS.date]: Yup.date().typeError('Invalid date').required(REQUIRED),
  [FIELDS.data]: Yup.array()
    .of(
      Yup.object().shape({
        [FIELDS.purchase_lot_number]: reqObjectSchema,
        [FIELDS.detail]: Yup.array()
          .of(
            Yup.object().shape({
              [FIELDS.quantity]: smallPositiveReqNumberSchema,
              [FIELDS.actual_gazaana]: smallPositiveReqNumberSchema,
              [FIELDS.expected_gazaana]: smallPositiveReqNumberSchema,
              [FIELDS.formula]: reqObjectSchema,
              [FIELDS.warehouse]: reqObjectSchema,
            })
          )
          .unique(
            ['actual_gazaana', 'expected_gazaana', 'formula', 'warehouse'],
            'Detail is not unique'
          ),
      })
    )
    .unique(['lot_number'], 'Lot number can not be repeated'),
});
