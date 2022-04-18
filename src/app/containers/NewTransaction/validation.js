import * as Yup from 'yup';

import { isArrayOfObjectsUnique } from '../../utilities/objectUtils';
import { FIELDS } from './constants';

const REQUIRED = 'Required';
const NUMBER_ERROR = 'Please enter a value greater than 0';
const POSITIVE_NUM_ERROR = 'Please enter a valid value';
const INVALID_NUMBER = 'Not a valid number';

const numberSchema = Yup.number()
  .typeError(INVALID_NUMBER)
  .min(0, NUMBER_ERROR)
  .required(REQUIRED);

const postiveNumberSchema = Yup.number()
  .typeError(INVALID_NUMBER)
  .min(0.01, POSITIVE_NUM_ERROR)
  .required(REQUIRED);

const numberSchemaNotRequired = Yup.number().typeError(INVALID_NUMBER);

const objectSchema = Yup.object().typeError(REQUIRED).required(REQUIRED);
const textSchema = Yup.string().typeError(REQUIRED).required(REQUIRED);

Yup.addMethod(Yup.array, 'unique', function (keys, message) {
  return this.test('unique', message, function (array) {
    return isArrayOfObjectsUnique(array, keys);
  });
});

export const schema = Yup.object().shape({
  [FIELDS.PERSON]: objectSchema,
  [FIELDS.DATE]: Yup.date().typeError('Invalid Date'),
  [FIELDS.TRANS_TYPE]: textSchema,
  [FIELDS.ACCOUNT]: Yup.object()
    .nullable(true)
    .when(FIELDS.TRANS_TYPE, {
      is: (val) => val === 'paid',
      then: objectSchema,
    }),
  [FIELDS.BOOK_NUM]: numberSchema,
  [FIELDS.BUILTY]: Yup.string(),
  [FIELDS.ACTION]: Yup.boolean().required(REQUIRED),
  [FIELDS.DISCOUNT]: numberSchemaNotRequired,
  [FIELDS.PAID_AMOUNT]: numberSchemaNotRequired,
  [FIELDS.DETAIL]: Yup.string().nullable(true),
  [FIELDS.TRANS_DETAIL]: Yup.array().of(
    Yup.object().shape({
      [FIELDS.ID]: Yup.string().nullable(true),
      [FIELDS.PRODUCT]: objectSchema,
      [FIELDS.GAZAANA]: objectSchema,
      [FIELDS.WAREHOUSE]: objectSchema,
      [FIELDS.RATE]: postiveNumberSchema,
      [FIELDS.QTY]: postiveNumberSchema,
    })
  ),
});
