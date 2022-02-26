import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";

import { Formik } from "formik";
import { Field } from "formik";
import { Form } from "formik";

import { FormAutoCompleteField } from "../../utilities/formUtils";
import { FormTextField } from "../../utilities/formUtils";
import { FormDateField } from "../../utilities/formUtils";

import { StyledButton } from "./styled";
import { Wrapper } from "./styled";

import * as api from "./api";
import { INITIAL_VALUES } from "./constants";
import { FIELDS } from "./constants";
import { schema } from "./validation";

import { BANKS } from "../../../constants/banks";

import { withSnackbar } from "../../hoc/withSnackbar";

import { findErrorMessage } from "../../utilities/objectUtils";

const IssuePersonalCheque = (props) => {
  const customers = useSelector((state) => state.essentials.customers);
  const suppliers = useSelector((state) => state.essentials.suppliers);
  const accounts = useSelector((state) => state.essentials.accountTypes);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, actions) => {
    setLoading(true);
    api
      .issueCheckApi(values)
      .then((response) => {
        setLoading(false);
        props.showSuccessSnackbar("Cheque issued");
        actions.resetForm();
      })
      .catch((error) => {
        setLoading(false);
        props.showErrorSnackbar(findErrorMessage(error.response.data));
      });
  };

  return (
    <Formik
      enableReinitialize
      onSubmit={async (values, actions) => handleSubmit(values, actions)}
      initialValues={INITIAL_VALUES}
      validationSchema={schema}
    >
      {({ setFieldValue }) => (
        <Form>
          <Wrapper container direction="column" rowGap={2}>
            <Field
              onChange={(event, value, reason) => {
                if (reason === "clear" || !value) {
                  setFieldValue(FIELDS.person, "");
                } else {
                  setFieldValue(FIELDS.person, value?.value);
                }
              }}
              component={FormAutoCompleteField}
              options={[...suppliers, ...customers]}
              name={FIELDS.person}
              label="Select Party"
            />
            <Field
              component={FormTextField}
              size="small"
              name={FIELDS.cheque_number}
              label="Cheque Number"
              fullWidth
            />
            <Field
              onChange={(event, value, reason) => {
                if (reason === "clear" || !value) {
                  setFieldValue(FIELDS.bank, "");
                } else {
                  setFieldValue(FIELDS.bank, value?.value);
                }
              }}
              component={FormAutoCompleteField}
              options={BANKS}
              name={FIELDS.bank}
              label="Bank"
            />
            <Field
              onChange={(event, value, reason) => {
                if (reason === "clear" || !value) {
                  setFieldValue(FIELDS.account_type, "");
                } else {
                  setFieldValue(FIELDS.account_type, value?.value);
                }
              }}
              component={FormAutoCompleteField}
              options={accounts}
              name={FIELDS.account_type}
              label="Bank Account"
            />
            <Field
              component={FormTextField}
              size="small"
              name={FIELDS.amount}
              label="Cheque Amount"
              fullWidth
            />
            <Field
              onChange={(value) => {
                setFieldValue(FIELDS.due_date, value || "");
              }}
              component={FormDateField}
              name={FIELDS.due_date}
              label="Due Date"
              inputformat="DD/MM/yyyy"
              size="small"
            />
            <Field
              onChange={(value) => {
                setFieldValue(FIELDS.date, value || "");
              }}
              component={FormDateField}
              name={FIELDS.date}
              label="Cheque Entry Date"
              inputformat="DD/MM/yyyy"
              size="small"
            />
            <StyledButton
              loading={loading}
              type="submit"
              fullWidth
              variant="contained"
            >
              Submit
            </StyledButton>
          </Wrapper>
        </Form>
      )}
    </Formik>
  );
};

export default withSnackbar(IssuePersonalCheque);
