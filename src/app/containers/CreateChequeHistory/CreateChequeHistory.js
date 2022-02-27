import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";

import { Formik } from "formik";
import { Form } from "formik";
import { Field } from "formik";

import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { FormAutoCompleteField } from "../../utilities/formUtils";
import { FormTextField } from "../../utilities/formUtils";
import { FormDateField } from "../../utilities/formUtils";

import * as api from "./api";
import * as schema from "./validation";
import { getInitialValues } from "./constants";
import { FIELDS } from "./constants";

import { StyledPaper } from "./styled";
import { StyledButton } from "./styled";

import { BANKS } from "../../../constants/banks";
import { withSnackbar } from "../../hoc/withSnackbar";
import { findErrorMessage } from "../../utilities/objectUtils";

const CreateChequeHistory = ({
  chequeId,
  isChequeEntry,
  open,
  onClose,
  ...props
}) => {
  const accounts = useSelector((state) => state.essentials.accountTypes);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, actions) => {
    setLoading(true);
    api
      .createChequeHistory(values, isChequeEntry)
      .then((response) => {
        setLoading(false);
        props.showSuccessSnackbar("Added successfully");
        onClose();
        actions.resetForm();
      })
      .catch((error) => {
        setLoading(false);
        props.showErrorSnackbar(findErrorMessage(error.response.data));
      });
  };

  return (
    <Modal paper="true" open={open} onClose={onClose}>
      <StyledPaper>
        <Formik
          initialValues={getInitialValues(chequeId, isChequeEntry)}
          validationSchema={isChequeEntry ? schema.CHEQUE : schema.OTHER}
          onSubmit={async (values, actions) => handleSubmit(values, actions)}
        >
          {({ setFieldValue }) => (
            <Form>
              <Grid container direction="column" gap={2} alignItems="center">
                <Typography variant="h6">
                  {isChequeEntry
                    ? "Add Cheque (History)"
                    : "Add Payment (History)"}
                </Typography>
                <Field
                  component={FormTextField}
                  size="small"
                  name={FIELDS.AMOUNT}
                  label="Cheque Amount"
                  fullWidth
                />
                {isChequeEntry && (
                  <>
                    <Field
                      onChange={(event, value, reason) => {
                        if (reason === "clear" || !value) {
                          setFieldValue(FIELDS.BANK, "");
                        } else {
                          setFieldValue(FIELDS.BANK, value?.value);
                        }
                      }}
                      component={FormAutoCompleteField}
                      options={BANKS}
                      name={FIELDS.BANK}
                      label="Select Bank"
                    />
                    <Field
                      component={FormTextField}
                      size="small"
                      name={FIELDS.CHEQUE_NUMBER}
                      label="Cheque Number"
                      fullWidth
                    />
                    <Field
                      onChange={(value) => {
                        setFieldValue(FIELDS.DUE_DATE, value || "");
                      }}
                      component={FormDateField}
                      name={FIELDS.DUE_DATE}
                      label="Due Date"
                      inputformat="DD/MM/yyyy"
                      size="small"
                      fullWidth
                    />
                  </>
                )}
                {!isChequeEntry && (
                  <Field
                    onChange={(event, value, reason) => {
                      if (reason === "clear" || !value) {
                        setFieldValue(FIELDS.ACCOUNT_TYPE, "");
                      } else {
                        setFieldValue(FIELDS.ACCOUNT_TYPE, value?.value);
                      }
                    }}
                    component={FormAutoCompleteField}
                    options={accounts}
                    name={FIELDS.ACCOUNT_TYPE}
                    label="Select Bank"
                  />
                )}

                <Field
                  onChange={(value) => {
                    setFieldValue(FIELDS.DATE, value || "");
                  }}
                  component={FormDateField}
                  name={FIELDS.DATE}
                  label="Due Date"
                  inputformat="DD/MM/yyyy"
                  size="small"
                  fullWidth
                />
                <StyledButton fullWidth variant="contained" loading={loading}>
                  Submit
                </StyledButton>
              </Grid>
            </Form>
          )}
        </Formik>
      </StyledPaper>
    </Modal>
  );
};

export default withSnackbar(CreateChequeHistory);
