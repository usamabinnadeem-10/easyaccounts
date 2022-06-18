import React from 'react';

import { useSelector } from 'react-redux';

import { Formik } from 'formik';
import { Field } from 'formik';
import { Form } from 'formik';

import { FormAutoCompleteField } from '../../utilities/formUtils';
import { FormTextField } from '../../utilities/formUtils';
import { FormDateField } from '../../utilities/formUtils';

import { StyledButton } from './styled';
import { Wrapper } from './styled';

import { INITIAL_VALUES } from './constants';
import { FIELDS } from './constants';

import { personalSchema, externalSchema } from './validation';
import { formatValues } from './utils';

import { BANKS } from '../../../constants/banks';
import { convertDate } from '../../utilities/stringUtils';

const ChequeForm = ({ onSubmit, isLoading, isPersonal }) => {
  const customers = useSelector((state) => state.essentials.customers);
  const suppliers = useSelector((state) => state.essentials.suppliers);
  const accounts = useSelector((state) => state.essentials.accountTypes);

  const handleSubmit = (values, actions) => {
    onSubmit(
      {
        ...formatValues(values),
        due_date: convertDate(
          'yyyy-MM-DD HH:mm:ss',
          'yyyy-MM-DD',
          values.due_date
        ),
      },
      actions
    );
  };

  return (
    <Formik
      enableReinitialize
      onSubmit={async (values, actions) => handleSubmit(values, actions)}
      initialValues={INITIAL_VALUES}
      validationSchema={isPersonal ? personalSchema : externalSchema}>
      <Form>
        <Wrapper container direction='column' rowGap={2}>
          <Field
            component={FormAutoCompleteField}
            options={[...suppliers, ...customers]}
            name={FIELDS.person}
            label='Select Party'
          />
          <Field
            component={FormTextField}
            size='small'
            name={FIELDS.cheque_number}
            label='Cheque Number'
            fullWidth
          />
          <Field
            component={FormAutoCompleteField}
            options={BANKS}
            name={FIELDS.bank}
            label='Bank'
          />
          {isPersonal && (
            <Field
              component={FormAutoCompleteField}
              options={accounts}
              name={FIELDS.account_type}
              label='Bank Account'
            />
          )}

          <Field
            component={FormTextField}
            size='small'
            name={FIELDS.amount}
            label='Cheque Amount'
            fullWidth
          />
          <Field
            component={FormDateField}
            name={FIELDS.due_date}
            label='Due Date'
            size='small'
          />
          <Field
            component={FormDateField}
            name={FIELDS.date}
            label='Cheque Entry Date'
            size='small'
          />
          <StyledButton
            loading={isLoading}
            type='submit'
            fullWidth
            variant='contained'>
            Submit
          </StyledButton>
        </Wrapper>
      </Form>
    </Formik>
  );
};

export default ChequeForm;
