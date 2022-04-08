import * as Yup from 'yup';

import { isArrayOfObjectsUnique } from '../../utilities/objectUtils';

import { FIELDS } from './constants';

const REQUIRED = 'Required';
const objectSchema = Yup.object().typeError(REQUIRED).required(REQUIRED);

Yup.addMethod(Yup.array, 'unique', function (keys, message) {
  return this.test('unique', message, function (array) {
    return isArrayOfObjectsUnique(array, keys);
  });
});

export const schema = Yup.object().shape({
  [FIELDS.DATE]: Yup.date().typeError('Enter a valid date'),
  [FIELDS.TRANSFER_DETAIL]: Yup.array()
    .of(
      Yup.object().shape({
        [FIELDS.STOCK_ID]: objectSchema,
        [FIELDS.TO_WAREHOUSE]: objectSchema,
        [FIELDS.QUANTITY]: Yup.number()
          .typeError(REQUIRED)
          .min(0, 'Please enter a number greater than zero')
          .required(REQUIRED),
      })
    )
    .unique(['stock_id'], 'Please choose unique items to transfer'),
});
