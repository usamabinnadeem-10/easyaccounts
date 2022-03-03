import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";

import CustomFilters from "../../containers/CustomFilters";
import CustomTable from "../../components/CustomTable";
import Heading from "../../components/Heading";

import { ESSENTIAL_URLS } from "../../../constants/restEndPoints";

import { getFilters } from "./utils";
import { formatData } from "./utils";

import { COLUMNS } from "./constants";

const AccountHistory = (props) => {
  const accounts = useSelector((state) => state.essentials.accountTypes);
  const [data, setData] = useState([]);

  return (
    <div>
      <Heading heading="Account History" />
      <CustomFilters
        api={ESSENTIAL_URLS.ACCOUNT_HISTORY}
        onSearch={(data) => setData(formatData(data.data.results))}
        filters={getFilters(accounts)}
      />
      {data.length > 0 && <CustomTable columns={COLUMNS} data={data} />}
    </div>
  );
};

export default AccountHistory;
