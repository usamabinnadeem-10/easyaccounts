import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import CustomLoader from "../../components/CustomLoader/CustomLoader";

import { useParams } from "react-router";

import instance from "../../../utils/axiosApi";
import { TRANSACTION_URLS } from "../../../constants/restEndPoints";
import { getURL } from "../../utilities/stringUtils";
import {
  findPerson,
  findWarehouse,
  findProduct,
  findAccountType,
} from "../../views/LedgerTransaction/utils";

function ViewSingleTransaction() {
  const { uuid } = useParams();
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState({});

  useEffect(() => {
    instance
      .get(getURL(TRANSACTION_URLS.GET_TRANSACTION, "uuid", uuid))
      .then((res) => {
        setTransaction({
          ...res.data,
        });
        setLoading(false);
      });
  }, []);

  return <div></div>;
}

export default ViewSingleTransaction;
