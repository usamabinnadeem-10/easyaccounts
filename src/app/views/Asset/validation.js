import Yup from '../../utilities/yup';
import {
  reqObjectSchema,
  smallPositiveReqNumberSchema,
  reqTextSchema,
} from '../../utilities/yup';

import { FIELDS } from './constants';

export const schema = Yup.object().shape({
  [FIELDS.date]: Yup.date().typeError('Invalid Date'),
  [FIELDS.name]: reqTextSchema,
  [FIELDS.value]: smallPositiveReqNumberSchema,
  [FIELDS.status]: reqObjectSchema,
  [FIELDS.type]: reqObjectSchema,
});
