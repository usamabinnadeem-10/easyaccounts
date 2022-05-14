import Yup from '../../../utilities/yup';
import { reqNumberSchema, reqObjectSchema } from '../../../utilities/yup';

import { FIELDS } from './constants';

const REQUIRED = 'Required';

export const schema = Yup.object().shape({
  [FIELDS.person]: reqObjectSchema,
  [FIELDS.debit_type]: Yup.string().required(REQUIRED),
  [FIELDS.manual_invoice_serial]: reqNumberSchema,
  [FIELDS.date]: Yup.date().typeError('Invalid date').required(REQUIRED),
  [FIELDS.data]: Yup.array()
    .of(
      Yup.object().shape({
        [FIELDS.lot_number]: reqObjectSchema,
        [FIELDS.detail]: Yup.array()
          .of(
            Yup.object().shape({
              [FIELDS.quantity]: reqNumberSchema,
              [FIELDS.actual_gazaana]: reqNumberSchema,
              [FIELDS.expected_gazaana]: reqNumberSchema,
              [FIELDS.formula]: reqObjectSchema,
              [FIELDS.warehouse]: reqObjectSchema,
              [FIELDS.rate]: reqNumberSchema,
            })
          )
          .unique(
            ['actual_gazaana', 'expected_gazaana', 'formula'],
            'Detail is not unique'
          ),
      })
    )
    .unique(['lot_number'], 'Lot number can not be repeated'),
});

export const schemaTransfer = Yup.object().shape({
  [FIELDS.person]: reqObjectSchema,
  [FIELDS.debit_type]: Yup.string().required(REQUIRED),
  [FIELDS.manual_invoice_serial]: reqNumberSchema,
  [FIELDS.date]: Yup.date().typeError('Invalid date').required(REQUIRED),
  [FIELDS.data]: Yup.array()
    .of(
      Yup.object().shape({
        [FIELDS.lot_number]: reqObjectSchema,
        [FIELDS.detail]: Yup.array()
          .of(
            Yup.object().shape({
              [FIELDS.quantity]: reqNumberSchema,
              [FIELDS.actual_gazaana]: reqNumberSchema,
              [FIELDS.expected_gazaana]: reqNumberSchema,
              [FIELDS.formula]: reqObjectSchema,
              [FIELDS.to_warehouse]: reqObjectSchema,
            })
          )
          .unique(
            ['actual_gazaana', 'expected_gazaana', 'formula'],
            'Detail is not unique'
          ),
      })
    )
    .unique(['lot_number'], 'Lot number can not be repeated'),
});
