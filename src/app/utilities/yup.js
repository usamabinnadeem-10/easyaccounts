import * as Yup from 'yup';

import { isArrayOfObjectsUnique } from './objectUtils';

const REQUIRED = 'Required';
const NUMBER_ERROR = 'Please enter a value greater than 0';
const POSITIVE_NUMBER_ERROR = 'Please enter a value greater than or equal to 1';
const SMALL_POSITIVE_NUMBER_ERROR = 'Please enter a bigger value';
const INVALID_OBJECT_ERROR = 'Not a valid choice';

export const reqNumberSchema = Yup.number()
  .typeError(REQUIRED)
  .min(0, NUMBER_ERROR)
  .required(REQUIRED);

export const positiveReqNumberSchema = Yup.number()
  .typeError(REQUIRED)
  .min(1, POSITIVE_NUMBER_ERROR)
  .required(REQUIRED);

export const smallPositiveReqNumberSchema = Yup.number()
  .typeError(REQUIRED)
  .min(0.000001, SMALL_POSITIVE_NUMBER_ERROR)
  .required(REQUIRED);

export const reqObjectSchema = Yup.object()
  .typeError(REQUIRED)
  .required(REQUIRED);

export const notReqObjectSchema = Yup.object().typeError(INVALID_OBJECT_ERROR);

export const reqTextSchema = Yup.string().required(REQUIRED);

Yup.addMethod(Yup.array, 'unique', function (keys, message) {
  return this.test('unique', message, function (array) {
    return isArrayOfObjectsUnique(array, keys);
  });
});

export default Yup;
