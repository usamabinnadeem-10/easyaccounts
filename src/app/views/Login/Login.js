import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Formik } from "formik";
import { Field } from "formik";
import { Form } from "formik";

import { Grid } from "@mui/material";

import { FormTextField } from "../../utilities/formUtils";

import { INITIAL_VALUES } from "./constants";

import { LoginWrapper } from "./styled";
import { StyledForm } from "./styled";
import { StyledButton } from "./styled";

import { validationSchema } from "./validation";

import { getToken } from "../../../store/auth";

import { withSnackbar } from "../../hoc/withSnackbar";

const Login = ({ showErrorSnackbar }) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.loginFailed) {
      setLoading(false);
      showErrorSnackbar(auth.error);
    }
  }, [auth]);

  const handleSubmit = (values) => {
    setLoading(true);
    dispatch(getToken(values));
  };

  return (
    <LoginWrapper container direction="column">
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        onSubmit={async (values) => handleSubmit(values)}
      >
        <StyledForm>
          <Grid container direction="column" rowGap={2}>
            <Field
              component={FormTextField}
              size="small"
              name="username"
              label="Username"
              fullWidth
            />
            <Field
              component={FormTextField}
              size="small"
              name="password"
              label="Password"
              fullWidth
              type="password"
            />
            <StyledButton loading={loading} variant="contained" type="submit">
              LOGIN
            </StyledButton>
          </Grid>
        </StyledForm>
      </Formik>
    </LoginWrapper>
  );
};

export default withSnackbar(Login);
