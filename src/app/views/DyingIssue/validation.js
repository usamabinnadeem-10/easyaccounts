import * as Yup from 'yup';

import { reqNumberSchema, reqObjectSchema } from '../../utilities/yup';

import { FIELDS } from './constants';

const REQUIRED = 'Required';

export const validationSchema = Yup.object().shape({
  [FIELDS.dying_unit]: reqObjectSchema,
  [FIELDS.raw_product]: reqObjectSchema,
  [FIELDS.manual_book_number]: reqNumberSchema,
  [FIELDS.date]: Yup.date().typeError('Invalid date').required(REQUIRED),
  [FIELDS.warehouse]: reqObjectSchema,

  [FIELDS.detail]: Yup.array().of(
    Yup.object().shape({
      [FIELDS.quantity]: reqNumberSchema,
      [FIELDS.yards_per_piece_actual]: reqNumberSchema,
      [FIELDS.yards_per_piece_expected]: reqNumberSchema,
      [FIELDS.calculated_yards_per_piece]: reqNumberSchema,
      [FIELDS.calculated_expected]: reqNumberSchema,
      [FIELDS.formula_numerator]: reqNumberSchema,
      [FIELDS.formula_denominator]: reqNumberSchema,
    })
  ),
});
