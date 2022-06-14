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
import PaymentReceipt from '../../components/PaymentReceipt';

import * as constants from './constants';
import { formatPaymentDataForPosting } from './utils';
import { schema } from './validation';
import * as api from './api';
import { findErrorMessage } from '../../utilities/objectUtils';
import { withSnackbar } from '../../hoc/withSnackbar';

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

const Payment = ({ showErrorSnackbar, ...props }) => {
  const essentials = useSelector((state) => state.essentials);
  const [images, setImages] = useState([]);
  const [showReceipt, setShowReceipt] = useState(true);
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const convertImagesToFiles = (images) => {
    let formData = new FormData();
    images.forEach((img) => {
      formData.append(`images`, img.file);
    });
    return formData;
  };

  const handleSubmit = (values) => {
    setLoading(true);
    api
      .uploadImageApi(convertImagesToFiles(images))
      .then((response) => {
        api
          .createPaymentApi(
            formatPaymentDataForPosting(values, response.data.image_ids)
          )
          .then((response) => {
            setShowReceipt(true);
            setPaymentData(response.data);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            showErrorSnackbar(findErrorMessage(error.response.data));
          });
      })
      .catch((error) => {
        setLoading(false);
        showErrorSnackbar(findErrorMessage(error.response.data));
      });
  };

  return (
    <>
      {showReceipt && !!paymentData ? (
        <PaymentReceipt paymentData={paymentData} {...props} />
      ) : (
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
                      options={[
                        ...essentials.customers,
                        ...essentials.suppliers,
                      ]}
                      label='Person'
                      name='person'
                    />
                    <FastField
                      component={FormDateField}
                      label='Date'
                      name='date'
                    />
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
                      onImageUpload={setImages}
                      maxImages={5}
                      images={images}
                    />
                  </Grid>
                  <Button
                    disabled={loading}
                    variant='contained'
                    onClick={handleSubmit}>
                    POST
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </ViewWrapper>
      )}
    </>
  );
};

export default withSnackbar(Payment);
