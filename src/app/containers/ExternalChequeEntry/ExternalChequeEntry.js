import React from "react";
import { useState } from "react";

import ChequeForm from "../ChequeForm";

import { withSnackbar } from "../../hoc/withSnackbar";
import { findErrorMessage } from "../../utilities/objectUtils";

import * as api from "./api";

const ExternalChequeEntry = (props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, actions) => {
    setLoading(true);
    api
      .createExternalChequeApi(values)
      .then((response) => {
        setLoading(false);
        props.showSuccessSnackbar("Party check added");
        actions.resetForm();
      })
      .catch((error) => {
        setLoading(false);
        props.showErrorSnackbar(findErrorMessage(error.response.data));
      });
  };
  return <ChequeForm isLoading={loading} onSubmit={handleSubmit} />;
};

export default withSnackbar(ExternalChequeEntry);
