import React from 'react';

import { useState } from 'react';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router';

import { Formik } from 'formik';
import { Form } from 'formik';

import TransactionHeader from '../../components/TransactionHeader';
import TransactionBody from '../../components/TransactionBody';
import TransactionFooter from '../../components/TransactionFooter';

import { schema } from './validation';
import { getInitialValues } from './utils';

const Transaction = ({
  prefixes,
  tableMeta,
  updateMetaData,
  defaultRow,
  transactionTypes,
  metaConstants,
  personIdentifier,
  showAccountTypes,
  options,
  selectedOptions,
  natures,
  transactionDetails,
  transaction,
  showErrorSnackbar,
  warehouses,
}) => {
  const TRANSACTION_FOOTER = [
    {
      placeholder: 'Discount',
      visible: true,
      type: 'number',
      name: 'discount',
    },
    {
      placeholder: 'Paid Amount',
      visible: showAccountTypes,
      type: 'number',
      name: 'paid_amount',
    },
    {
      placeholder: 'Detail',
      visible: true,
      type: 'text',
      name: 'detail',
    },
  ];

  return (
    <Formik
      initialValues={getInitialValues(transactionTypes)}
      validationSchema={schema}
      enableReinitialize>
      {({ values, errors, touched, setFieldValue, handleSubmit }) => (
        <Form>
          <TransactionHeader
            values={values}
            setFieldValue={setFieldValue}
            personIdentifier={personIdentifier}
            selectedOptions={selectedOptions}
            options={options}
            updateMetaData={updateMetaData}
            metaConstants={metaConstants}
            showAccountTypes={showAccountTypes}
            transactionTypes={transactionTypes}
          />
          <TransactionBody
            transactionTypes={transactionTypes}
            values={values}
            errors={errors}
            touched={touched}
            warehouses={warehouses}
          />
          <TransactionFooter
            values={values}
            transactionFooter={TRANSACTION_FOOTER}
            loading={false}
            makeTransaction={() => {}}
          />
        </Form>
      )}
    </Formik>
  );
};

export default Transaction;
