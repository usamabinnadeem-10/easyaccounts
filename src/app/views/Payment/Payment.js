import React from 'react';
import { useState } from 'react';
import Heading from '../../components/Heading';
import ViewWrapper from '../../components/ViewWrapper';

import { Formik } from 'formik';
import { Form } from 'formik';
import { FastField } from 'formik';

import { useSelector } from 'react-redux';

import { Button } from '@mui/material';
import { Grid } from '@mui/material';

import { FormAutoCompleteField } from '../../utilities/formUtils';
import { FormDateField } from '../../utilities/formUtils';
import { FormTextField } from '../../utilities/formUtils';

import ImageUpload from '../../components/ImageUpload';

import * as constants from './constants';
import { schema } from './validation';
import { createPaymentApi } from './api';

const Row = ({ children }) => {
  return (
    <Grid container justifyContent='space-between'>
      {React.Children.map(children, (child) => (
        <Grid item xs={12} sm={5}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
};

const Payment = () => {
  const essentials = useSelector((state) => state.essentials);
  const [images, setImages] = useState([]);

  const handleSubmit = (values) => {
    createPaymentApi(values).then((response) => {
      console.log(response.data);
    });
  };

  async function formatImageArray(images, setFieldValue) {
    let imgs = images.map((img) => img.file);
    setFieldValue('images', imgs);
  }

  return (
    <ViewWrapper>
      <Heading heading='Add Payment' />
      <Formik
        initialValues={constants.INITIAL_VALUES}
        validationSchema={schema}
        onSubmit={(values, actions) => handleSubmit(values)}>
        {({ setFieldValue, handleSubmit }) => (
          <Form>
            <Grid container direction='column' rowGap={2}>
              <Row>
                <FastField
                  component={FormAutoCompleteField}
                  options={[...essentials.customers, ...essentials.suppliers]}
                  label='Person'
                  name='person'
                />
                <FastField component={FormDateField} label='Date' name='date' />
              </Row>
              <Row>
                <FastField
                  component={FormAutoCompleteField}
                  options={constants.NATURES}
                  label='Credit / Debit'
                  name='nature'
                />
                <FastField
                  component={FormTextField}
                  label='Amount'
                  name='amount'
                  fullWidth
                />
              </Row>
              <Row>
                <FastField
                  component={FormAutoCompleteField}
                  options={essentials.accountTypes}
                  label='Account'
                  name='account_type'
                />
              </Row>
              <Grid item xs={12}>
                <ImageUpload
                  onImageUpload={(images) => {
                    setImages(images);
                    formatImageArray(images, setFieldValue);
                  }}
                  maxImages={5}
                  images={images}
                />
              </Grid>
              <Button variant='contained' onClick={handleSubmit}>
                POST
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </ViewWrapper>
  );
};

export default Payment;
