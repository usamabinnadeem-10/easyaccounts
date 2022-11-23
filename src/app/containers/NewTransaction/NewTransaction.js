import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router";

import { Formik } from "formik";
import { Form } from "formik";

import ScannerInput from "../../components/ScannerInput";
import TransactionHeader from "../../components/TransactionHeader";
import TransactionBody from "../../components/TransactionBody";
import TransactionFooter from "../../components/TransactionFooter";

import { schema } from "./validation";
import {
  getInitialValues,
  getTransactionFooter,
  formatDataForPosting,
} from "./utils";
import { postTransactionApi, editTransactionApi } from "./api";
import { withSnackbar } from "../../hoc/withSnackbar";
import { getURL } from "../../utilities/stringUtils";
import { VIEW_SINGLE_TRANSACTION } from "../../../constants/routesConstants";
import { findErrorMessage } from "../../utilities/objectUtils";
import { setShouldFetch } from "../../../store/transactions";

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
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [scannerValue, setScannerValue] = useState(null);
  const [duplicates, setDuplicates] = useState(null);

  const TRANSACTION_FOOTER = useMemo(
    () => getTransactionFooter(showAccountTypes),
    [showAccountTypes]
  );

  const redirect = (transaction) => {
    history.push({
      pathname: getURL(VIEW_SINGLE_TRANSACTION, "uuid", transaction.id),
      state: transaction,
    });
  };

  const postTransaction = (values, actions) => {
    setLoading(true);
    let data = formatDataForPosting(values, natures, prefixes);
    let api = transaction ? editTransactionApi : postTransactionApi;
    api(data, transaction?.id)
      .then((response) => {
        // dispatch(setShouldFetch(true));
        actions.resetForm();
        setLoading(false);
        redirect(response.data);
      })
      .catch((error) => {
        showErrorSnackbar(findErrorMessage(error.response.data));
        dispatch(setShouldFetch(true)); // only fetch stock if there is an error
        setLoading(false);
      });
  };

  const handleReloadStock = () => {
    dispatch(setShouldFetch(true));
  };

  return (
    <>
      <Formik
        initialValues={getInitialValues(transactionTypes, transaction)}
        validationSchema={schema}
        enableReinitialize={!!transaction}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => postTransaction(values, actions)}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          setTouched,
          handleSubmit,
        }) => (
          <Form>
            <TransactionHeader
              handleReloadStock={handleReloadStock}
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
              resetDuplicates={() => setDuplicates(null)}
              showErrorSnackbar={showErrorSnackbar}
              duplicates={duplicates}
              transactionTypes={transactionTypes}
              values={values}
              errors={errors}
              touched={touched}
              warehouses={warehouses}
              transaction={transaction}
              setFieldValue={setFieldValue}
              scannerValue={scannerValue}
              setScannerValue={setScannerValue}
            />
            <TransactionFooter
              setDuplicates={setDuplicates}
              values={values}
              transactionFooter={TRANSACTION_FOOTER}
              loading={loading}
              makeTransaction={() => handleSubmit()}
              transaction={transaction}
            />
          </Form>
        )}
      </Formik>
      {/* <ScannerInput getScannedValue={(val) => setScannerValue(val)} /> */}
    </>
  );
};

export default withSnackbar(Transaction);
