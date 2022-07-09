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

import {
  FormAutoCompleteField,
  FormRow,
  FormTextField,
  FormDateField,
} from '../../utilities/formUtils';

import ImageUpload from '../../components/ImageUpload';
import ImageViewAndDelete from '../../containers/ImageViewAndDelete';
import PaymentReceipt from '../../components/PaymentReceipt';

import * as constants from './constants';
import { formatPaymentDataForPosting } from './utils';
import { schema } from './validation';
import * as api from './api';
import { ReceiptImagesWrapper } from './styled';
import { findErrorMessage } from '../../utilities/objectUtils';
import { withSnackbar } from '../../hoc/withSnackbar';

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
                  <FormRow>
                    <FastField
                      component={FormAutoCompleteField}
                      options={[
                        ...essentials.customers,
                        ...essentials.suppliers,
                        ...essentials.equities,
                        ...essentials.advanceExpenses,
                      ]}
                      label='Person'
                      name='person'
                    />
                    <FastField
                      component={FormDateField}
                      label='Date'
                      name='date'
                    />
                  </FormRow>
                  <FormRow>
                    <FastField
                      component={FormAutoCompleteField}
                      options={constants.NATURES}
                      label='Credit (جمع) / Debit (بنام)'
                      name='nature'
                    />
                    <FastField
                      component={FormTextField}
                      label='Amount'
                      name='amount'
                      fullWidth
                    />
                  </FormRow>
                  <FormRow>
                    <FastField
                      component={FormAutoCompleteField}
                      options={essentials.accountTypes}
                      label='Account'
                      name='account_type'
                    />
                    <FastField
                      component={FormTextField}
                      label='Detail'
                      name='detail'
                      fullWidth
                    />
                  </FormRow>
                  {edit && editData.image_urls?.length > 0 && (
                    <ReceiptImagesWrapper item xs={12}>
                      <ImageViewAndDelete
                        imageUrls={editData.image_urls}
                        onDelete={() => {}}
                      />
                    </ReceiptImagesWrapper>
                  )}

                  <Grid sx={{ overflow: 'auto !important' }} item xs={12}>
                    <ImageUpload
                      onImageUpload={setImages}
                      maxImages={5 - editData?.image_urls.length ?? 5}
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
