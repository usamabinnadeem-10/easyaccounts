import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import CustomLoader from "../../components/CustomLoader/CustomLoader";

import instance from "../../../utils/axiosApi";
import { ESSENTIAL_URLS } from "../../../constants/restEndPoints";

const Daybook = () => {
  const [transactions, setTransactions] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance.get(ESSENTIAL_URLS.DAY_BOOK).then((res) => {
      setTransactions(res.data.transactions);
      setLedgers(res.data.ledgers);
      setExpenses(res.data.expenses);
      setAccounts(res.data.accounts);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? <CustomLoader pageLoader loading={loading} /> : <div></div>}
    </div>
  );
};

export default Daybook;
