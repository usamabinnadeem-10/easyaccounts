import Yup from '../../../utilities/yup';
import {
  positiveReqNumberSchema,
  reqObjectSchema,
} from '../../../utilities/yup';

import { FIELDS } from './constants';

const REQUIRED = 'Required';

export const schema = Yup.object().shape({
  [FIELDS.person]: reqObjectSchema,
  [FIELDS.debit_type]: Yup.string().required(REQUIRED),
  [FIELDS.manual_serial]: positiveReqNumberSchema,
  [FIELDS.date]: Yup.date().typeError('Invalid date').required(REQUIRED),
  [FIELDS.data]: Yup.array()
    .of(
      Yup.object().shape({
        [FIELDS.lot_number]: reqObjectSchema,
        [FIELDS.detail]: Yup.array()
          .of(
            Yup.object().shape({
              [FIELDS.quantity]: positiveReqNumberSchema,
              [FIELDS.actual_gazaana]: positiveReqNumberSchema,
              [FIELDS.expected_gazaana]: positiveReqNumberSchema,
              [FIELDS.rate_gazaana]: positiveReqNumberSchema,
              // [FIELDS.formula]: reqObjectSchema,
              [FIELDS.warehouse]: reqObjectSchema,
              [FIELDS.rate]: positiveReqNumberSchema,
            }),
          )
          .unique(
            ['actual_gazaana', 'expected_gazaana', 'formula', 'warehouse'],
            'Detail is not unique',
          ),
      }),
    )
    .unique(['lot_number'], 'Lot number can not be repeated'),
});
