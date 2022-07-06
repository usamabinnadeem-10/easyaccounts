import Yup from '../../utilities/yup';
import {
  reqObjectSchema,
  smallPositiveReqNumberSchema,
  reqNumberSchema,
} from '../../utilities/yup';

import { FIELDS } from './constants';

export const schema = Yup.object().shape({
  [FIELDS.DATE]: Yup.date().typeError('Enter a valid date'),
  [FIELDS.FROM_WAREHOUSE]: reqObjectSchema,
  // [FIELDS.MANUAL_SERIAL]: reqNumberSchema,
  [FIELDS.TRANSFER_DETAIL]: Yup.array()
    .of(
      Yup.object().shape({
        [FIELDS.PRODUCT]: reqObjectSchema,
        [FIELDS.GAZAANA]: reqNumberSchema,
        [FIELDS.TO_WAREHOUSE]: reqObjectSchema,
        [FIELDS.QUANTITY]: smallPositiveReqNumberSchema,
      })
    )
    .unique(
      ['product', 'yards_per_piece', 'to_warehouse'],
      'Please choose unique items to transfer'
    ),
});
