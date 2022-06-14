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
import ImageViewAndDelete from '../../containers/ImageViewAndDelete';
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

const Payment = ({
  showErrorSnackbar,
  edit = false,
  editData = null,
  ...props
}) => {
  const essentials = useSelector((state) => state.essentials);
  const [images, setImages] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const convertImagesToFiles = (images) => {
    let formData = new FormData();
    images.forEach((img) => {
      formData.append(`images`, img.file);
    });
    return formData;
  };

  const handleGoBack = () => {
    setShowReceipt(false);
    setImages([]);
    setPaymentData(null);
  };

  const handleSubmit = (values) => {
    let paymentApi = edit ? api.editPaymentApi : api.createPaymentApi;
    setLoading(true);
    api
      .uploadImageApi(convertImagesToFiles(images))
      .then((response) => {
        paymentApi(
          formatPaymentDataForPosting(values, response.data.image_ids),
          editData?.id
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
      {edit ? (
        <Button onClick={props.handleCloseEditing}>Cancel editing</Button>
      ) : showReceipt ? (
        <Button onClick={handleGoBack}>Go back</Button>
      ) : (
        <></>
      )}
      {showReceipt && !!paymentData ? (
        <PaymentReceipt paymentData={paymentData} {...props} />
      ) : (
        <ViewWrapper>
          <Heading heading='Add Payment' />
          <Formik
            initialValues={edit ? editData : constants.INITIAL_VALUES}
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
                    {edit && (
                      <ImageViewAndDelete
                        imageUrls={editData.image_urls}
                        onDelete={() => {}}
                      />
                    )}
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
                    {edit ? 'Edit' : 'Post'}
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
