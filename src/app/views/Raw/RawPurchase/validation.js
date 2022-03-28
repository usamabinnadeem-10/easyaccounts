import * as Yup from 'yup';

import { FIELDS } from './constants';

const REQUIRED = 'Required';
const NUMBER_ERROR = 'Please enter a value greater than 0';

const numberSchema = Yup.number()
  .typeError(REQUIRED)
  .min(0, NUMBER_ERROR)
  .required(REQUIRED);

const objectSchema = Yup.object().typeError(REQUIRED).required(REQUIRED);

export const schema = Yup.object().shape({
  [FIELDS.person]: objectSchema,
  [FIELDS.manual_invoice_serial]: numberSchema,
  [FIELDS.date]: Yup.date().typeError('Invalid date').required(REQUIRED),
  [FIELDS.lots]: Yup.array().of(
    Yup.object().shape({
      [FIELDS.raw_product]: objectSchema,
      [FIELDS.issued]: Yup.boolean().required(REQUIRED),
      [FIELDS.dying_unit]: Yup.object().typeError(REQUIRED).nullable(),
      [FIELDS.lot_detail]: Yup.array().of(
        Yup.object().shape({
          [FIELDS.quantity]: numberSchema,
          [FIELDS.actual_gazaana]: numberSchema,
          [FIELDS.expected_gazaana]: numberSchema,
          [FIELDS.formula]: objectSchema,
          [FIELDS.warehouse]: Yup.object().typeError(REQUIRED).nullable(),
          [FIELDS.rate]: numberSchema,
        })
      ),
    })
  ),
});
