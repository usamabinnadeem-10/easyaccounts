import { Field, FastField } from 'formik';

import { getFieldProps } from '../common/utils';

const FastOrSlowField = ({ field, errors, touched, lotIndex }) => {
  return (
    <>
      {field.isFast ? (
        <FastField
          {...getFieldProps(field, errors, touched)}
          isError={
            !!errors.lots?.[lotIndex]?.[field.name] &&
            touched.lots?.[lotIndex]?.[field.name]
          }
          errorText={errors.lots?.[lotIndex]?.[field.name]}
        />
      ) : (
        <Field
          {...getFieldProps(field, errors, touched)}
          isError={
            !!errors.lots?.[lotIndex]?.[field.name] &&
            touched.lots?.[lotIndex]?.[field.name]
          }
          errorText={errors.lots?.[lotIndex]?.[field.name]}
        />
      )}
    </>
  );
};

export default FastOrSlowField;
