import React from "react";
import { useState } from "react";

import ChequeForm from "../ChequeForm";

import * as api from "./api";

import { withSnackbar } from "../../hoc/withSnackbar";
import { findErrorMessage } from "../../utilities/objectUtils";

const IssuePersonalCheque = (props) => {
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

  return <ChequeForm onSubmit={handleSubmit} isLoading={loading} isPersonal />;
};

export default withSnackbar(IssuePersonalCheque);
