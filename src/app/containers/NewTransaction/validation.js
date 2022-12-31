import Yup from '../../utilities/yup';
import {
  reqObjectSchema,
  smallPositiveReqNumberSchema,
} from '../../utilities/yup';

import { FIELDS } from './constants';

const REQUIRED = 'Required';
const POSITIVE_NUM_ERROR = 'Please enter a valid value';
const INVALID_NUMBER = 'Not a valid number';

const postiveNumberSchema = Yup.number()
  .typeError(INVALID_NUMBER)
  .min(0.01, POSITIVE_NUM_ERROR)
  .required(REQUIRED);

const numberSchemaNotRequired = Yup.number()
  .nullable()
  .typeError(INVALID_NUMBER);

const textSchema = Yup.string().typeError(REQUIRED).required(REQUIRED);

export const schema = Yup.object().shape({
  [FIELDS.PERSON]: reqObjectSchema,
  [FIELDS.DATE]: Yup.date().typeError('Invalid Date'),
  [FIELDS.TRANS_TYPE]: textSchema,
  [FIELDS.ACCOUNT]: Yup.object()
    .nullable(true)
    .when(FIELDS.TRANS_TYPE, {
      is: (val) => val === 'paid',
      then: reqObjectSchema,
    }),
  [FIELDS.BOOK_NUM]: numberSchemaNotRequired,
  [FIELDS.WASOOLI_NUMBER]: numberSchemaNotRequired,
  [FIELDS.BUILTY]: Yup.string().nullable(),
  [FIELDS.ACTION]: Yup.boolean().required(REQUIRED),
  [FIELDS.CANCELLED]: Yup.boolean().required(REQUIRED),
  [FIELDS.DISCOUNT]: numberSchemaNotRequired,
  [FIELDS.PAID_AMOUNT]: numberSchemaNotRequired,
  [FIELDS.DETAIL]: Yup.string().nullable(true),
  [FIELDS.TRANS_DETAIL]: Yup.array()
    // .of(
    //   Yup.object().shape({
    //     [FIELDS.PRODUCT]: reqObjectSchema,
    //     [FIELDS.GAZAANA]: reqObjectSchema,
    //     [FIELDS.WAREHOUSE]: reqObjectSchema,
    //     [FIELDS.RATE]: postiveNumberSchema,
    //     [FIELDS.QTY]: smallPositiveReqNumberSchema,
    //   }),
    // )
    .when(FIELDS.CANCELLED, {
      is: (val) => val === true,
      then: Yup.array().nullable(true),
      otherwise: Yup.array().of(
        Yup.object().shape({
          [FIELDS.PRODUCT]: reqObjectSchema,
          [FIELDS.GAZAANA]: reqObjectSchema,
          [FIELDS.WAREHOUSE]: reqObjectSchema,
          [FIELDS.RATE]: postiveNumberSchema,
          [FIELDS.QTY]: smallPositiveReqNumberSchema,
        }),
      ),
    })
    .unique(
      [FIELDS.PRODUCT, FIELDS.GAZAANA, FIELDS.WAREHOUSE],
      'Please use unique entries',
    ),
});
