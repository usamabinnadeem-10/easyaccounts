import Yup from '../../../utilities/yup';
import {
  positiveReqNumberSchema,
  reqObjectSchema,
  notReqObjectSchema,
} from '../../../utilities/yup';

import { FIELDS } from './constants';

const REQUIRED = 'Required';

export const schema = Yup.object().shape({
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
              [FIELDS.formula]: notReqObjectSchema,
              [FIELDS.warehouse]: reqObjectSchema,
              [FIELDS.transferring_warehouse]: reqObjectSchema,
            }),
          )
          .unique(
            [
              'actual_gazaana',
              'expected_gazaana',
              'formula',
              'warehouse',
              'transferring_warehouse',
            ],
            'Detail is not unique',
          ),
      }),
    )
    .unique(['lot_number'], 'Lot number can not be repeated'),
});
