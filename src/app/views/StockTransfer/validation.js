import * as Yup from 'yup';

import { isArrayOfObjectsUnique } from '../../utilities/objectUtils';

import { FIELDS } from './constants';

const REQUIRED = 'Required';
const objectSchema = Yup.object().typeError(REQUIRED).required(REQUIRED);
const numberSchema = Yup.number()
  .typeError(REQUIRED)
  .min(0, 'Please enter a number greater than zero')
  .required(REQUIRED);
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
        [FIELDS.PRODUCT]: objectSchema,
        [FIELDS.GAZAANA]: numberSchema,
        [FIELDS.WAREHOUSE]: objectSchema,
        [FIELDS.TO_WAREHOUSE]: objectSchema,
        [FIELDS.QUANTITY]: numberSchema,
      })
    )
    .unique(
      ['product', 'yards_per_piece', 'from_warehouse', 'to_warehouse'],
      'Please choose unique items to transfer'
    ),
});
